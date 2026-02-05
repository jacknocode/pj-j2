import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateLandingPage } from '../../../lp-generator/src/templates/landing-page';
import type { LPConfig } from '../../../lp-generator/src/types/lp-config';

/**
 * LP Generator Tool for Mastra
 * Generates landing pages based on configuration
 */

const FeatureSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

const StatisticSchema = z.object({
  number: z.string(),
  label: z.string(),
  description: z.string().optional(),
});

const StepSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string().optional(),
  content: z.string(),
  avatar: z.string().optional(),
});

const FooterLinkSchema = z.object({
  text: z.string(),
  url: z.string(),
});

export const lpGeneratorTool = createTool({
  id: 'generate-landing-page',
  description: 'Generate a landing page HTML file based on configuration. Creates a fully-styled landing page with MyVision design tokens.',
  inputSchema: z.object({
    // Meta
    title: z.string().describe('Page title for SEO'),
    description: z.string().describe('Page description for SEO'),
    keywords: z.array(z.string()).optional().describe('SEO keywords'),

    // Hero section
    headline: z.string().describe('Main headline'),
    subheadline: z.string().optional().describe('Secondary headline'),
    heroDescription: z.string().describe('Hero section description'),
    ctaText: z.string().describe('Primary CTA button text'),
    ctaLink: z.string().describe('Primary CTA button link'),

    // Optional sections
    includeStatistics: z.boolean().optional().describe('Include statistics section'),
    statistics: z.array(StatisticSchema).optional().describe('Statistics to display'),

    includeFeatures: z.boolean().optional().describe('Include features section'),
    featuresTitle: z.string().optional().describe('Features section title'),
    features: z.array(FeatureSchema).optional().describe('Feature items'),

    includeSteps: z.boolean().optional().describe('Include steps/process section'),
    stepsTitle: z.string().optional().describe('Steps section title'),
    steps: z.array(StepSchema).optional().describe('Step items'),

    includeTestimonials: z.boolean().optional().describe('Include testimonials section'),
    testimonialsTitle: z.string().optional().describe('Testimonials section title'),
    testimonials: z.array(TestimonialSchema).optional().describe('Testimonial items'),

    // Final CTA
    finalCtaHeadline: z.string().describe('Final CTA section headline'),
    finalCtaDescription: z.string().optional().describe('Final CTA section description'),

    // Footer
    companyName: z.string().describe('Company name for footer'),
    companyInfo: z.string().optional().describe('Company information'),
    footerLinks: z.array(FooterLinkSchema).optional().describe('Footer links'),

    // Output
    outputPath: z.string().optional().describe('Output file path (default: ./output/landing-page.html)'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    filePath: z.string(),
  }),
  execute: async ({ context }) => {
    try {
      // Build LP configuration
      const config: LPConfig = {
        meta: {
          title: context.title,
          description: context.description,
          keywords: context.keywords,
        },
        hero: {
          headline: context.headline,
          subheadline: context.subheadline,
          description: context.heroDescription,
          ctaText: context.ctaText,
          ctaLink: context.ctaLink,
        },
        cta: {
          headline: context.finalCtaHeadline,
          description: context.finalCtaDescription,
          ctaText: context.ctaText,
          ctaLink: context.ctaLink,
          backgroundColor: 'primary',
        },
        footer: {
          companyName: context.companyName,
          companyInfo: context.companyInfo,
          links: context.footerLinks,
        },
      };

      // Add optional sections
      if (context.includeStatistics && context.statistics && context.statistics.length > 0) {
        config.statistics = {
          title: '実績',
          stats: context.statistics,
        };
      }

      if (context.includeFeatures && context.features && context.features.length > 0) {
        config.features = {
          title: context.featuresTitle || '特徴',
          features: context.features,
        };
      }

      if (context.includeSteps && context.steps && context.steps.length > 0) {
        config.steps = {
          title: context.stepsTitle || 'ご利用の流れ',
          steps: context.steps,
        };
      }

      if (context.includeTestimonials && context.testimonials && context.testimonials.length > 0) {
        config.testimonials = {
          title: context.testimonialsTitle || 'お客様の声',
          testimonials: context.testimonials,
        };
      }

      // Generate HTML
      const html = generateLandingPage(config);

      // Determine output path
      const outputPath = context.outputPath || join(process.cwd(), 'output', 'landing-page.html');
      const outputDir = join(process.cwd(), 'output');

      // Create output directory if it doesn't exist
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      // Write file
      writeFileSync(outputPath, html, 'utf-8');

      return {
        success: true,
        message: `Landing page generated successfully`,
        filePath: outputPath,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to generate landing page: ${error instanceof Error ? error.message : 'Unknown error'}`,
        filePath: '',
      };
    }
  },
});
