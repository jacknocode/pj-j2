/**
 * Landing Page Template Generator
 * Generates HTML based on LP configuration
 */

import type {
  LPConfig,
  HeroSection,
  FeatureSection,
  StatisticsSection,
  StepsSection,
  TestimonialsSection,
  CTASection,
  FooterSection,
} from '../types/lp-config';

export function generateLandingPage(config: LPConfig): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(config.meta.description)}">
  ${config.meta.keywords ? `<meta name="keywords" content="${config.meta.keywords.join(', ')}">` : ''}
  ${config.meta.ogImage ? `<meta property="og:image" content="${config.meta.ogImage}">` : ''}
  <title>${escapeHtml(config.meta.title)}</title>
  <link rel="stylesheet" href="/src/styles/design-tokens.css">
  <style>
    /* Additional LP-specific styles */
    .hero {
      position: relative;
      min-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--spacing-4xl) var(--spacing-xl);
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero h1 {
      margin-bottom: var(--spacing-lg);
      font-size: var(--font-size-5xl);
    }

    .hero p {
      font-size: var(--font-size-xl);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-2xl);
    }

    .hero-cta {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-2xl);
      margin-top: var(--spacing-3xl);
    }

    .feature-card {
      text-align: center;
      padding: var(--spacing-xl);
    }

    .feature-icon {
      font-size: var(--font-size-4xl);
      margin-bottom: var(--spacing-md);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-3xl);
      text-align: center;
      margin-top: var(--spacing-3xl);
    }

    .steps-container {
      max-width: 900px;
      margin: var(--spacing-3xl) auto 0;
    }

    .step-item {
      display: flex;
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-3xl);
      align-items: flex-start;
    }

    .step-item:last-child {
      margin-bottom: 0;
    }

    .step-content h3 {
      margin-bottom: var(--spacing-sm);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--spacing-2xl);
      margin-top: var(--spacing-3xl);
    }

    .testimonial-card {
      background: var(--color-white);
      padding: var(--spacing-xl);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }

    .testimonial-avatar {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-full);
      background: var(--color-bg-secondary);
    }

    .cta-section {
      text-align: center;
    }

    .cta-section.bg-primary {
      background-color: var(--color-primary);
      color: var(--color-text-inverse);
    }

    .cta-section.bg-primary h2,
    .cta-section.bg-primary p {
      color: var(--color-text-inverse);
    }

    .footer {
      background-color: var(--color-text-primary);
      color: var(--color-text-inverse);
      padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .footer-links a {
      color: var(--color-text-inverse);
      opacity: 0.8;
      transition: opacity var(--transition-fast);
    }

    .footer-links a:hover {
      opacity: 1;
    }

    .footer-bottom {
      text-align: center;
      padding-top: var(--spacing-xl);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: var(--font-size-4xl);
      }

      .hero-cta {
        flex-direction: column;
      }

      .features-grid,
      .stats-grid,
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  ${generateHero(config.hero)}
  ${config.statistics ? generateStatistics(config.statistics) : ''}
  ${config.features ? generateFeatures(config.features) : ''}
  ${config.steps ? generateSteps(config.steps) : ''}
  ${config.testimonials ? generateTestimonials(config.testimonials) : ''}
  ${generateCTA(config.cta)}
  ${generateFooter(config.footer)}
</body>
</html>`;
}

function generateHero(hero: HeroSection): string {
  return `
  <section class="hero">
    <div class="hero-content">
      ${hero.logo ? `<img src="${hero.logo}" alt="Logo" style="max-width: 200px; margin-bottom: var(--spacing-xl);">` : ''}
      <h1>${escapeHtml(hero.headline)}</h1>
      ${hero.subheadline ? `<p style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-semibold);">${escapeHtml(hero.subheadline)}</p>` : ''}
      <p>${escapeHtml(hero.description)}</p>
      <div class="hero-cta">
        <a href="${hero.ctaLink}" class="btn-primary">${escapeHtml(hero.ctaText)}</a>
        ${hero.secondaryCtaText && hero.secondaryCtaLink ?
          `<a href="${hero.secondaryCtaLink}" class="btn-secondary">${escapeHtml(hero.secondaryCtaText)}</a>` : ''}
      </div>
    </div>
  </section>`;
}

function generateStatistics(stats: StatisticsSection): string {
  return `
  <section class="section section-alt">
    <div class="container">
      ${stats.title ? `<h2 style="text-align: center; margin-bottom: var(--spacing-xl);">${escapeHtml(stats.title)}</h2>` : ''}
      <div class="stats-grid">
        ${stats.stats.map(stat => `
          <div class="stat-item">
            <div class="stat-number">${escapeHtml(stat.number)}</div>
            <div class="stat-label">${escapeHtml(stat.label)}</div>
            ${stat.description ? `<p style="margin-top: var(--spacing-sm); font-size: var(--font-size-sm);">${escapeHtml(stat.description)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateFeatures(features: FeatureSection): string {
  return `
  <section class="section">
    <div class="container">
      <h2 style="text-align: center;">${escapeHtml(features.title)}</h2>
      ${features.subtitle ? `<p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-lg); margin-top: var(--spacing-md);">${escapeHtml(features.subtitle)}</p>` : ''}
      <div class="features-grid">
        ${features.features.map(feature => `
          <div class="feature-card">
            ${feature.icon ? `<div class="feature-icon">${feature.icon}</div>` : ''}
            <h3>${escapeHtml(feature.title)}</h3>
            <p style="color: var(--color-text-secondary);">${escapeHtml(feature.description)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateSteps(steps: StepsSection): string {
  return `
  <section class="section section-alt">
    <div class="container">
      <h2 style="text-align: center;">${escapeHtml(steps.title)}</h2>
      ${steps.subtitle ? `<p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-lg); margin-top: var(--spacing-md);">${escapeHtml(steps.subtitle)}</p>` : ''}
      <div class="steps-container">
        ${steps.steps.map(step => `
          <div class="step-item">
            <div class="step-indicator">${step.number}</div>
            <div class="step-content">
              <h3>${escapeHtml(step.title)}</h3>
              <p style="color: var(--color-text-secondary);">${escapeHtml(step.description)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateTestimonials(testimonials: TestimonialsSection): string {
  return `
  <section class="section">
    <div class="container">
      <h2 style="text-align: center;">${escapeHtml(testimonials.title)}</h2>
      ${testimonials.subtitle ? `<p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-lg); margin-top: var(--spacing-md);">${escapeHtml(testimonials.subtitle)}</p>` : ''}
      <div class="testimonials-grid">
        ${testimonials.testimonials.map(testimonial => `
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="testimonial-avatar"></div>
              <div>
                <div style="font-weight: var(--font-weight-semibold);">${escapeHtml(testimonial.name)}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                  ${escapeHtml(testimonial.role)}${testimonial.company ? ` @ ${escapeHtml(testimonial.company)}` : ''}
                </div>
              </div>
            </div>
            <p style="color: var(--color-text-secondary);">${escapeHtml(testimonial.content)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateCTA(cta: CTASection): string {
  const bgClass = cta.backgroundColor === 'primary' ? 'bg-primary' : '';
  return `
  <section class="section cta-section ${bgClass}">
    <div class="container">
      <h2>${escapeHtml(cta.headline)}</h2>
      ${cta.description ? `<p style="font-size: var(--font-size-lg); margin-top: var(--spacing-md); margin-bottom: var(--spacing-xl);">${escapeHtml(cta.description)}</p>` : ''}
      <a href="${cta.ctaLink}" class="btn-primary" style="margin-top: var(--spacing-lg);">${escapeHtml(cta.ctaText)}</a>
    </div>
  </section>`;
}

function generateFooter(footer: FooterSection): string {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div>
        <h3 style="color: var(--color-text-inverse); margin-bottom: var(--spacing-md);">${escapeHtml(footer.companyName)}</h3>
        ${footer.companyInfo ? `<p style="opacity: 0.8;">${escapeHtml(footer.companyInfo)}</p>` : ''}
      </div>
      ${footer.links && footer.links.length > 0 ? `
        <div class="footer-links">
          <h4 style="color: var(--color-text-inverse); margin-bottom: var(--spacing-md);">リンク</h4>
          ${footer.links.map(link => `
            <a href="${link.url}">${escapeHtml(link.text)}</a>
          `).join('')}
        </div>
      ` : ''}
    </div>
    <div class="footer-bottom">
      ${footer.copyright || `© ${new Date().getFullYear()} ${escapeHtml(footer.companyName)}. All rights reserved.`}
    </div>
  </footer>`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
