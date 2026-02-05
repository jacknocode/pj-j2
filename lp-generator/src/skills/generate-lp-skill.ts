/**
 * Generate LP Skill for Claude Code
 *
 * This skill provides a command-line interface for LP generation
 * Usage: generate-lp [options]
 */

import { lpOrchestratorAgent, type LPGenerationRequest } from '../agents/orchestrator';
import type { TargetAudience } from '../agents/content-strategy-agent';
import type { LPPatternType } from '../types/myvision-lp-patterns';

export interface GenerateLPSkillOptions {
  // Basic
  goal?: string;
  pattern?: LPPatternType;

  // Target
  experienceLevel?: 'experienced' | 'inexperienced' | 'mixed';
  targetIndustry?: string[];

  // Metrics
  salaryIncrease?: string;
  supportCount?: string;
  successRate?: string;
  rating?: number;

  // Advanced
  quickMode?: boolean;
  verbose?: boolean;
}

export class GenerateLPSkill {
  name = 'generate-lp';
  description = 'Generate a landing page based on MyVision patterns and best practices';

  /**
   * Execute the skill
   */
  async execute(options: GenerateLPSkillOptions = {}): Promise<void> {
    console.log('🚀 LP Generator Skill - Starting...\n');

    try {
      // Quick Mode
      if (options.quickMode) {
        return await this.executeQuickMode(options);
      }

      // Full Mode
      return await this.executeFullMode(options);
    } catch (error) {
      console.error('❌ Error during LP generation:', error);
      throw error;
    }
  }

  /**
   * Quick Mode - シンプルな入力で即座に生成
   */
  private async executeQuickMode(options: GenerateLPSkillOptions): Promise<void> {
    console.log('⚡ Quick Mode enabled\n');

    const businessGoal = options.goal || 'ハイクラス転職支援サービスのリード獲得';
    const experienceLevel = options.experienceLevel || 'mixed';

    console.log(`📋 Business Goal: ${businessGoal}`);
    console.log(`👥 Target: ${experienceLevel}\n`);

    const result = await lpOrchestratorAgent.quickGenerate(businessGoal, experienceLevel);

    this.displayResults(result, options.verbose || false);
  }

  /**
   * Full Mode - 詳細なカスタマイズ
   */
  private async executeFullMode(options: GenerateLPSkillOptions): Promise<void> {
    console.log('🔧 Full Mode - Building custom LP...\n');

    // Build request
    const request: LPGenerationRequest = {
      business_goal: options.goal || 'ハイクラス転職支援サービスのリード獲得',
      target_audience: this.buildTargetAudience(options),
      key_metrics: {
        avg_salary_increase: options.salaryIncrease,
        support_count: options.supportCount,
        success_rate: options.successRate,
        rating: options.rating,
      },
      force_pattern: options.pattern,
    };

    console.log('📊 Request Configuration:');
    console.log(`  Goal: ${request.business_goal}`);
    console.log(`  Experience Level: ${request.target_audience.demographics.experience_level}`);
    if (options.pattern) {
      console.log(`  Forced Pattern: ${options.pattern}`);
    }
    console.log('');

    const result = await lpOrchestratorAgent.generateLP(request);

    this.displayResults(result, options.verbose || false);
  }

  /**
   * Build Target Audience from options
   */
  private buildTargetAudience(options: GenerateLPSkillOptions): TargetAudience {
    const experienceLevel = options.experienceLevel || 'mixed';

    return {
      demographics: {
        age_range: '20-35',
        experience_level: experienceLevel,
        target_industry: options.targetIndustry || ['Consulting', 'Finance', 'IT'],
      },
      psychographics: {
        motivations: ['年収アップ', 'キャリアチェンジ', 'スキルアップ'],
        pain_points: ['選考対策の不安', '情報不足', '時間がない'],
        decision_factors: ['実績', '専門性', 'サポート品質', 'ネットワーク'],
      },
      behavior: {
        search_intent:
          experienceLevel === 'inexperienced' ? 'research' : 'active_job_seeking',
        urgency_level: options.pattern === 'event_speed_selection' ? 'high' : 'medium',
      },
    };
  }

  /**
   * Display Results
   */
  private displayResults(result: any, verbose: boolean): void {
    console.log('✅ LP Generation Complete!\n');

    console.log('📈 Strategy Summary:');
    console.log(`  Pattern: ${result.strategy.recommended_pattern}`);
    console.log(`  Rationale: ${result.strategy.rationale}`);
    console.log('');

    console.log('📝 Generated Copy:');
    console.log(`  Hero Catchphrase: "${result.generated_copy.hero_catchphrase}"`);
    console.log(`  Primary CTA: "${result.generated_copy.primary_cta}"`);
    console.log('');

    if (result.generated_copy.section_headlines) {
      console.log('📑 Section Headlines:');
      Object.entries(result.generated_copy.section_headlines).forEach(([section, headline]) => {
        console.log(`  ${section}: "${headline}"`);
      });
      console.log('');
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      result.warnings.forEach((warning: string) => {
        console.log(`  - ${warning}`);
      });
      console.log('');
    }

    console.log('💡 Recommendations:');
    result.recommendations.slice(0, 5).forEach((rec: string) => {
      console.log(`  • ${rec}`);
    });
    console.log('');

    if (verbose) {
      console.log('🔍 Detailed Structure:');
      console.log(JSON.stringify(result.lp_structure, null, 2));
      console.log('');
    }

    console.log('✨ Next Steps:');
    console.log('  1. Review the generated structure');
    console.log('  2. Customize content as needed');
    console.log('  3. Export to HTML using the template generator');
    console.log('  4. Run A/B tests on recommended variations');
  }
}

// Export singleton instance
export const generateLPSkill = new GenerateLPSkill();

/**
 * CLI Entry Point (for direct execution)
 */
export async function executeLPGenerationCLI(args: string[]): Promise<void> {
  const options: GenerateLPSkillOptions = {
    quickMode: args.includes('--quick'),
    verbose: args.includes('--verbose') || args.includes('-v'),
  };

  // Parse arguments
  const goalIndex = args.indexOf('--goal');
  if (goalIndex >= 0 && args[goalIndex + 1]) {
    options.goal = args[goalIndex + 1];
  }

  const patternIndex = args.indexOf('--pattern');
  if (patternIndex >= 0 && args[patternIndex + 1]) {
    options.pattern = args[patternIndex + 1] as LPPatternType;
  }

  const expIndex = args.indexOf('--experience');
  if (expIndex >= 0 && args[expIndex + 1]) {
    options.experienceLevel = args[expIndex + 1] as any;
  }

  await generateLPSkill.execute(options);
}

// If run directly (ES modules compatible)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  executeLPGenerationCLI(process.argv.slice(2)).catch(console.error);
}
