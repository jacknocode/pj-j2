/**
 * Landing Page Configuration Types
 * Defines the structure for LP generation
 */

export interface LPConfig {
  meta: MetaConfig;
  hero: HeroSection;
  features?: FeatureSection;
  statistics?: StatisticsSection;
  steps?: StepsSection;
  testimonials?: TestimonialsSection;
  cta: CTASection;
  footer: FooterSection;
}

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface HeroSection {
  headline: string;
  subheadline?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  logo?: string;
}

export interface FeatureSection {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export interface Feature {
  icon?: string;
  title: string;
  description: string;
}

export interface StatisticsSection {
  title?: string;
  stats: Statistic[];
}

export interface Statistic {
  number: string;
  label: string;
  description?: string;
}

export interface StepsSection {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface TestimonialsSection {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
}

export interface CTASection {
  headline: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: 'primary' | 'secondary' | 'white';
}

export interface FooterSection {
  companyName: string;
  companyInfo?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'github';
  url: string;
}
