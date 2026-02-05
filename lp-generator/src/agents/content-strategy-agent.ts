/**
 * Content Strategy Agent
 *
 * Role: LP全体のコンテンツ戦略を立案
 * - ターゲットオーディエンスの分析
 * - 最適なLPパターンの選定
 * - 各セクションの優先順位付け
 * - メッセージング戦略の構築
 */

import {
  LPPatternType,
  PATTERN_TEMPLATES,
  CONTENT_STRATEGY_HINTS,
  type ContentStrategyHint,
  type MyVisionLPStructure,
} from '../types/myvision-lp-patterns';

export interface TargetAudience {
  demographics: {
    age_range?: string;
    experience_level: 'experienced' | 'inexperienced' | 'mixed';
    current_industry?: string[];
    target_industry?: string[];
  };
  psychographics: {
    motivations: string[];
    pain_points: string[];
    decision_factors: string[];
  };
  behavior: {
    search_intent: 'research' | 'active_job_seeking' | 'passive_interest';
    urgency_level: 'low' | 'medium' | 'high';
  };
}

export interface ContentStrategy {
  recommended_pattern: LPPatternType;
  rationale: string;
  target_audience: TargetAudience;
  content_hints: ContentStrategyHint;
  section_priorities: {
    section: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    rationale: string;
  }[];
  messaging_framework: {
    primary_value_prop: string;
    supporting_messages: string[];
    proof_points: string[];
  };
}

export class ContentStrategyAgent {
  /**
   * ターゲットオーディエンスに基づいて最適なLPパターンを推奨
   */
  recommendPattern(audience: TargetAudience): LPPatternType {
    const { experience_level } = audience.demographics;
    const { urgency_level } = audience.behavior;

    // 未経験者向け
    if (experience_level === 'inexperienced') {
      return 'inexperienced_education';
    }

    // 緊急性が高い（イベント誘導）
    if (urgency_level === 'high' && audience.behavior.search_intent === 'active_job_seeking') {
      return 'event_speed_selection';
    }

    // デフォルト：ブランド総合型
    return 'brand_general_standard';
  }

  /**
   * 包括的なコンテンツ戦略を生成
   */
  generateStrategy(
    businessGoal: string,
    audience: TargetAudience,
    keyMetrics?: {
      avg_salary_increase?: string;
      support_count?: string;
      success_rate?: string;
    }
  ): ContentStrategy {
    const pattern = this.recommendPattern(audience);
    const contentHints = CONTENT_STRATEGY_HINTS[pattern];

    // セクション優先順位の決定
    const sectionPriorities = this.determineSectionPriorities(pattern, audience);

    // メッセージングフレームワークの構築
    const messaging_framework = this.buildMessagingFramework(pattern, audience, keyMetrics);

    return {
      recommended_pattern: pattern,
      rationale: this.explainPatternChoice(pattern, audience),
      target_audience: audience,
      content_hints: contentHints,
      section_priorities: sectionPriorities,
      messaging_framework,
    };
  }

  /**
   * パターン選択の理由を説明
   */
  private explainPatternChoice(pattern: LPPatternType, audience: TargetAudience): string {
    switch (pattern) {
      case 'brand_general_standard':
        return `幅広いターゲット層に対して、信頼性と実績を軸とした説得を行うため、ブランド総合型を推奨します。${
          audience.demographics.experience_level === 'mixed'
            ? '経験者・未経験者の両方にリーチするには、実績ベースの訴求が最適です。'
            : ''
        }`;

      case 'inexperienced_education':
        return `ターゲットが未経験者中心のため、不安解消と教育的アプローチを重視したパターンを推奨します。業界の背景説明や選考対策の詳細な提示により、心理的ハードルを下げます。`;

      case 'event_speed_selection':
        return `緊急性が高く、能動的な求職者がターゲットのため、限定性とスピード感を全面に出したパターンを推奨します。1Day選考会などの特別イベントに最適です。`;
    }
  }

  /**
   * セクション優先順位の決定
   */
  private determineSectionPriorities(
    pattern: LPPatternType,
    audience: TargetAudience
  ): ContentStrategy['section_priorities'] {
    const basePriorities: Record<string, ContentStrategy['section_priorities']> = {
      brand_general_standard: [
        {
          section: 'hero_section',
          priority: 'critical',
          rationale: '第一印象で信頼性を確立し、定量的実績で興味を喚起',
        },
        {
          section: 'trust_builder',
          priority: 'critical',
          rationale: '提携ファームのロゴとアドバイザーの経歴で権威性を証明',
        },
        {
          section: 'service_differentiation',
          priority: 'high',
          rationale: '独自の選考対策プログラムで競合との差別化',
        },
        {
          section: 'success_data_repository',
          priority: 'high',
          rationale: '具体的な支援事例で「自分もできる」という確信を醸成',
        },
        {
          section: 'conversion_optimizer',
          priority: 'critical',
          rationale: '最終的な離脱を防ぎ、登録へ導く',
        },
      ],
      inexperienced_education: [
        {
          section: 'hero_section',
          priority: 'critical',
          rationale: '共感的なメッセージで不安を受け止める',
        },
        {
          section: 'market_context',
          priority: 'critical',
          rationale: '業界の成長性とキャリアチェンジの可能性を論理的に説明',
        },
        {
          section: 'service_differentiation',
          priority: 'critical',
          rationale: 'フェルミ推定・ケース面接対策の詳細で、最大の障壁を除去',
        },
        {
          section: 'success_data_repository',
          priority: 'high',
          rationale: '他業界からの転職成功例で実現可能性を提示',
        },
        {
          section: 'trust_builder',
          priority: 'medium',
          rationale: '元コンサルタントの存在で対策の質を保証',
        },
      ],
      event_speed_selection: [
        {
          section: 'hero_section',
          priority: 'critical',
          rationale: '限定性と締切で即座の行動を促す',
        },
        {
          section: 'event_details',
          priority: 'critical',
          rationale: '1Dayで完結する効率性と特別感を詳細に説明',
        },
        {
          section: 'simple_entry',
          priority: 'high',
          rationale: '参加ハードルを極限まで下げる',
        },
        {
          section: 'trust_builder',
          priority: 'medium',
          rationale: 'CEO登壇などの権威付けで信頼性を補完',
        },
      ],
    };

    return basePriorities[pattern] || basePriorities.brand_general_standard;
  }

  /**
   * メッセージングフレームワークの構築
   */
  private buildMessagingFramework(
    pattern: LPPatternType,
    audience: TargetAudience,
    keyMetrics?: {
      avg_salary_increase?: string;
      support_count?: string;
      success_rate?: string;
    }
  ): ContentStrategy['messaging_framework'] {
    const frameworks: Record<LPPatternType, ContentStrategy['messaging_framework']> = {
      brand_general_standard: {
        primary_value_prop: '業界トップクラスの実績とネットワークで、最高のキャリアを実現',
        supporting_messages: [
          `${keyMetrics?.avg_salary_increase || '平均122万円'}の年収アップ実績`,
          `${keyMetrics?.support_count || '8,000名以上'}の転職支援`,
          '200社以上のファームとの強固なコネクション',
          '元戦略ファーム出身のプロフェッショナルが徹底サポート',
        ],
        proof_points: [
          'Google口コミ 4.8/5.0',
          '業界支援実績No.1',
          '書類選考通過率 85%以上',
          '内定獲得までの平均期間 2.5ヶ月',
        ],
      },
      inexperienced_education: {
        primary_value_prop: '未経験でも大丈夫。あなたの経験を活かしたコンサル転職を実現',
        supporting_messages: [
          '未経験者の支援実績が全体の9割',
          'SE・営業・マーケティング経験が高く評価される理由',
          'フェルミ推定・ケース面接を基礎から徹底対策',
          'DX需要の高まりで、業界未経験者の採用が急増',
        ],
        proof_points: [
          '未経験からの内定率 78%',
          '対策資料 100ページ以上',
          '模擬面接 無制限',
          '他業界からの転職事例 1,000件以上',
        ],
      },
      event_speed_selection: {
        primary_value_prop: '1日で選考完結。特別な機会を逃さないで',
        supporting_messages: [
          '通常3ヶ月の選考が1日で完了',
          'CEO/採用責任者と直接面談',
          '限定30名のみの特別枠',
          '参加者の内定率 65%',
        ],
        proof_points: [
          '過去の1Day選考会 満足度 95%',
          '平均2社の内定獲得',
          '参加無料・交通費補助あり',
          '当日内定も可能',
        ],
      },
    };

    return frameworks[pattern];
  }

  /**
   * LP構造の初期テンプレートを生成
   */
  generateLPTemplate(strategy: ContentStrategy): Partial<MyVisionLPStructure> {
    const pattern = strategy.recommended_pattern;
    const template = PATTERN_TEMPLATES[pattern];

    return {
      ...template,
      metadata: {
        company_name: '株式会社MyVision',
        industry: 'Consulting Recruitment',
        key_competency: 'Operational Excellence & Executive Network',
      },
    };
  }
}

// Singleton instance
export const contentStrategyAgent = new ContentStrategyAgent();
