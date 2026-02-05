/**
 * LP Generator Orchestrator
 *
 * Role: LP生成プロセス全体を統括
 * - サブエージェントの呼び出しと調整
 * - 各層（Identity, Logic, Content, Conversion）の構築
 * - 最終的なLP構造の生成と検証
 */

import { contentStrategyAgent, type TargetAudience, type ContentStrategy } from './content-strategy-agent';
import { copywritingAgent } from './copywriting-agent';
import type { MyVisionLPStructure, LPPatternType } from '../types/myvision-lp-patterns';

export interface LPGenerationRequest {
  // Business Context
  business_goal: string;
  company_name?: string;
  industry?: string;

  // Target Audience
  target_audience: TargetAudience;

  // Key Metrics (optional)
  key_metrics?: {
    avg_salary_increase?: string;
    support_count?: string;
    success_rate?: string;
    rating?: number;
  };

  // Customization
  custom_sections?: {
    section_name: string;
    content: any;
  }[];

  // Advanced Options
  force_pattern?: LPPatternType;
  exclude_sections?: string[];
}

export interface LPGenerationResult {
  success: boolean;
  strategy: ContentStrategy;
  lp_structure: MyVisionLPStructure;
  generated_copy: {
    hero_catchphrase: string;
    primary_cta: string;
    section_headlines: Record<string, string>;
  };
  recommendations: string[];
  warnings?: string[];
}

export class LPOrchestratorAgent {
  /**
   * LP生成のメインエントリーポイント
   */
  async generateLP(request: LPGenerationRequest): Promise<LPGenerationResult> {
    console.log('[Orchestrator] Starting LP generation process...');

    // Step 1: Content Strategy（戦略立案）
    console.log('[Orchestrator] Step 1: Analyzing target audience and determining strategy...');
    const strategy = this.executeContentStrategy(request);

    // Step 2: Structure Building（構造構築）
    console.log('[Orchestrator] Step 2: Building LP structure based on strategy...');
    const lpStructure = this.buildLPStructure(strategy, request);

    // Step 3: Copywriting（コピーライティング）
    console.log('[Orchestrator] Step 3: Generating persuasive copy...');
    const generatedCopy = this.generateAllCopy(strategy, request);

    // Step 4: Final Assembly（最終組み立て）
    console.log('[Orchestrator] Step 4: Assembling final LP structure...');
    const finalStructure = this.assembleFinalLP(lpStructure, generatedCopy, request);

    // Step 5: Validation & Recommendations（検証と推奨事項）
    console.log('[Orchestrator] Step 5: Validating and generating recommendations...');
    const recommendations = this.generateRecommendations(strategy, finalStructure);
    const warnings = this.validateStructure(finalStructure);

    console.log('[Orchestrator] LP generation complete!');

    return {
      success: true,
      strategy,
      lp_structure: finalStructure,
      generated_copy: {
        hero_catchphrase: generatedCopy.hero_catchphrase,
        primary_cta: generatedCopy.primary_cta,
        section_headlines: generatedCopy.section_headlines,
      },
      recommendations,
      warnings,
    };
  }

  /**
   * Step 1: コンテンツ戦略の実行
   */
  private executeContentStrategy(request: LPGenerationRequest): ContentStrategy {
    const strategy = contentStrategyAgent.generateStrategy(
      request.business_goal,
      request.target_audience,
      request.key_metrics
    );

    // ユーザーが明示的にパターンを指定している場合は上書き
    if (request.force_pattern) {
      strategy.recommended_pattern = request.force_pattern;
      strategy.rationale = `ユーザー指定により ${request.force_pattern} パターンを適用します。`;
    }

    return strategy;
  }

  /**
   * Step 2: LP構造の構築
   */
  private buildLPStructure(strategy: ContentStrategy, request: LPGenerationRequest): MyVisionLPStructure {
    const pattern = strategy.recommended_pattern;
    const template = contentStrategyAgent.generateLPTemplate(strategy);

    // メタデータの設定
    const metadata = {
      company_name: request.company_name || template.metadata?.company_name || '株式会社MyVision',
      industry: request.industry || template.metadata?.industry || 'Consulting Recruitment',
      key_competency:
        template.metadata?.key_competency || 'Operational Excellence & Executive Network',
    };

    // パターンに基づいた構造の構築
    const structure: MyVisionLPStructure = {
      metadata,
      pattern: template.pattern!,
      hero_section: template.hero_section!,
      trust_builder: template.trust_builder || {
        meaning: 'エージェントとしての実力とネットワークの証明',
      },
      service_differentiation: template.service_differentiation || {
        meaning: '独自対策プログラムによる内定可能性の提示',
      },
      conversion_optimizer: template.conversion_optimizer || {
        meaning: '最終的な離脱防止と登録率の最大化',
        final_cta: {
          label: '無料転職相談',
          logic: 'risk_reversal',
        },
      },
    };

    // オプショナルセクションの追加
    if (pattern === 'brand_general_standard' || pattern === 'inexperienced_education') {
      structure.success_data_repository = {
        meaning: '成功事例による『自分もできる』という確信の付与',
        title: '転職成功事例',
        cases: [],
        logic: 'similarity_matching',
      };
    }

    // カスタムセクションの追加
    if (request.custom_sections) {
      // カスタムセクションの処理（拡張可能）
      console.log('[Orchestrator] Custom sections detected, extending structure...');
    }

    return structure;
  }

  /**
   * Step 3: すべてのコピーを生成
   */
  private generateAllCopy(
    strategy: ContentStrategy,
    request: LPGenerationRequest
  ): {
    hero_catchphrase: string;
    primary_cta: string;
    secondary_cta?: string;
    section_headlines: Record<string, string>;
  } {
    const pattern = strategy.recommended_pattern;

    // Hero Catchphrase
    const heroCopy = copywritingAgent.generateHeroCatchphrase(pattern, {
      company_value: strategy.messaging_framework.primary_value_prop,
    });

    // Primary CTA
    const primaryCTA = copywritingAgent.generateCTA(pattern, 'primary');

    // Secondary CTA
    const secondaryCTA = copywritingAgent.generateCTA(pattern, 'secondary');

    // Section Headlines
    const section_headlines: Record<string, string> = {};
    const sectionsToGenerate = ['trust_builder', 'service_differentiation', 'success_cases'];

    for (const section of sectionsToGenerate) {
      const headline = copywritingAgent.generateSectionHeadline(section, pattern);
      section_headlines[section] = headline.primary;
    }

    return {
      hero_catchphrase: heroCopy.primary,
      primary_cta: primaryCTA.primary,
      secondary_cta: secondaryCTA.primary,
      section_headlines,
    };
  }

  /**
   * Step 4: 最終的なLP構造の組み立て
   */
  private assembleFinalLP(
    structure: MyVisionLPStructure,
    generatedCopy: any,
    request: LPGenerationRequest
  ): MyVisionLPStructure {
    // Hero Section のコピーを更新
    structure.hero_section.catchphrase = {
      content: generatedCopy.hero_catchphrase,
      logic: 'benefit_driven',
    };

    structure.hero_section.primary_cta = {
      text: generatedCopy.primary_cta,
      link: '#contact',
      logic: 'low_hurdle',
    };

    // Key Metricsの反映
    if (request.key_metrics) {
      if (request.key_metrics.avg_salary_increase) {
        structure.hero_section.key_metric_salary = {
          value: request.key_metrics.avg_salary_increase,
          logic: 'anchoring_effect',
        };
      }

      if (request.key_metrics.support_count) {
        structure.hero_section.social_proof_count = {
          value: request.key_metrics.support_count,
          logic: 'bandwagon_effect',
        };
      }

      if (request.key_metrics.rating) {
        structure.hero_section.trust_indicator_rating = {
          value: request.key_metrics.rating,
          source: 'Google口コミ',
          logic: 'social_proof',
        };
      }
    }

    return structure;
  }

  /**
   * Step 5: 推奨事項の生成
   */
  private generateRecommendations(strategy: ContentStrategy, structure: MyVisionLPStructure): string[] {
    const recommendations: string[] = [];

    // パターンに基づいた推奨事項
    recommendations.push(
      `選択されたパターン: ${strategy.recommended_pattern}`,
      `ターゲット: ${strategy.target_audience.demographics.experience_level}`,
      `推奨理由: ${strategy.rationale}`
    );

    // セクション優先順位
    const criticalSections = strategy.section_priorities
      .filter(s => s.priority === 'critical')
      .map(s => s.section);

    if (criticalSections.length > 0) {
      recommendations.push(`重点セクション: ${criticalSections.join(', ')}`);
    }

    // コンテンツ推奨
    recommendations.push(
      `トーン: ${strategy.content_hints.tone}`,
      `重要メッセージ: ${strategy.content_hints.key_messages.slice(0, 2).join(' / ')}`
    );

    // A/Bテスト推奨
    recommendations.push(
      'A/Bテスト推奨項目:',
      '  - ヒーローキャッチフレーズのバリエーション',
      '  - CTAボタンの文言（現在 vs 代替案）',
      '  - 統計データの配置順序'
    );

    return recommendations;
  }

  /**
   * 構造の検証とWarningの生成
   */
  private validateStructure(structure: MyVisionLPStructure): string[] | undefined {
    const warnings: string[] = [];

    // Hero Sectionの必須要素チェック
    if (!structure.hero_section.catchphrase?.content) {
      warnings.push('Hero Sectionにキャッチフレーズがありません');
    }

    if (!structure.hero_section.primary_cta?.text) {
      warnings.push('Primary CTAが設定されていません');
    }

    // 統計データの有無
    if (!structure.hero_section.key_metric_salary && !structure.hero_section.social_proof_count) {
      warnings.push('定量的実績データが不足しています。年収アップ額や支援数の追加を推奨します。');
    }

    // Trust Builder
    if (
      !structure.trust_builder.partner_logos &&
      !structure.trust_builder.consultant_profiles
    ) {
      warnings.push(
        'Trust Builderセクションに権威付け要素がありません。提携ファームのロゴまたはアドバイザープロフィールの追加を推奨します。'
      );
    }

    return warnings.length > 0 ? warnings : undefined;
  }

  /**
   * クイック生成（シンプルなケース用）
   */
  async quickGenerate(
    businessGoal: string,
    targetExperienceLevel: 'experienced' | 'inexperienced' | 'mixed'
  ): Promise<LPGenerationResult> {
    const quickRequest: LPGenerationRequest = {
      business_goal: businessGoal,
      target_audience: {
        demographics: {
          experience_level: targetExperienceLevel,
        },
        psychographics: {
          motivations: ['年収アップ', 'キャリアチェンジ'],
          pain_points: ['選考対策の不安', '情報不足'],
          decision_factors: ['実績', '専門性', 'サポート品質'],
        },
        behavior: {
          search_intent: 'research',
          urgency_level: 'medium',
        },
      },
      key_metrics: {
        avg_salary_increase: '122万円',
        support_count: '8,000名以上',
        success_rate: '85%',
        rating: 4.8,
      },
    };

    return this.generateLP(quickRequest);
  }
}

// Singleton instance
export const lpOrchestratorAgent = new LPOrchestratorAgent();
