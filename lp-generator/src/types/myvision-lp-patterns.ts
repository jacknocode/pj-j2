/**
 * MyVision LP Pattern Definitions
 * Based on comprehensive analysis of MyVision's landing page structure
 *
 * Patterns:
 * 1. Brand General Standard - Wide audience, trust-based flow
 * 2. Inexperienced Education - Career switchers, anxiety to solution
 * 3. Event Speed Selection - Active job seekers, urgency-driven
 */

export type LPPatternType = 'brand_general_standard' | 'inexperienced_education' | 'event_speed_selection';

export type LogicFlow =
  | 'trust_logic_social_action'           // Trust -> Logic -> Social Proof -> Action
  | 'problem_solution_support_action'     // Problem/Anxiety -> Solution -> Support Proof -> Action
  | 'opportunity_efficiency_action';      // Limited Opportunity -> Efficiency -> Easy Entry -> Action

export type ComponentLogic =
  | 'value_prop_quantitative'   // 定量的価値提案（年収、実績数）
  | 'authority_proof'           // 権威性の証明（ロゴ、出身企業）
  | 'empathy_trigger'           // 共感のトリガー（事例、インタビュー）
  | 'urgency_scarcity'          // 緊急性と限定性（締切、限定枠）
  | 'benefit_driven'            // ベネフィット訴求
  | 'anchoring_effect'          // アンカリング効果
  | 'bandwagon_effect'          // バンドワゴン効果
  | 'social_proof'              // 社会的証明
  | 'low_hurdle'                // 心理的ハードル低下
  | 'authority_transfer'        // 権威の転移
  | 'expertise_validation'      // 専門性の検証
  | 'productization'            // 知識の製品化
  | 'skill_acquisition'         // スキル習得の保証
  | 'similarity_matching'       // 類似性マッチング
  | 'micro_commitment'          // マイクロコミットメント
  | 'risk_reversal';            // リスクリバーサル

/**
 * Four-layer LP Structure
 * 1. Identity Layer: Target, purpose, campaign ID
 * 2. Logic Layer: Persuasion structure
 * 3. Content Layer: Specific headlines, images, metrics
 * 4. Conversion Layer: Form design, micro-conversions
 */

export interface LPMetadata {
  company_name: string;
  industry: string;
  established?: string;
  key_competency: string;
}

export interface LPPattern {
  id: LPPatternType;
  target: string;
  logic_flow: LogicFlow;
  description: string;
}

export interface HeroComponent {
  meaning: string;
  catchphrase: {
    content: string;
    logic: ComponentLogic;
  };
  key_metric_salary?: {
    value: string;
    logic: ComponentLogic;
  };
  social_proof_count?: {
    value: string;
    logic: ComponentLogic;
  };
  trust_indicator_rating?: {
    value: number;
    source: string;
    logic: ComponentLogic;
  };
  primary_cta: {
    text: string;
    link: string;
    logic: ComponentLogic;
  };
}

export interface ConsultantProfile {
  name: string;
  previous_company: string;
  title: string;
  specialties: string[];
  support_count?: number;
  avatar?: string;
}

export interface TrustBuilderComponent {
  meaning: string;
  partner_logos?: {
    firms: string[];
    display: 'slider' | 'grid';
    logic: ComponentLogic;
  };
  consultant_profiles?: {
    profiles: ConsultantProfile[];
    logic: ComponentLogic;
  };
}

export interface ServiceDifferentiationComponent {
  meaning: string;
  proprietary_materials?: {
    items: string[];
    logic: ComponentLogic;
  };
  mock_interviews?: {
    description: string;
    unlimited: boolean;
    logic: ComponentLogic;
  };
  selection_support?: {
    types: string[];
    logic: ComponentLogic;
  };
}

export interface SupportCase {
  age: number;
  previous_industry: string;
  previous_role: string;
  current_firm: string;
  salary_before?: string;
  salary_after?: string;
  salary_increase?: string;
}

export interface SuccessDataComponent {
  meaning: string;
  title: string;
  cases: SupportCase[];
  logic: ComponentLogic;
}

export interface ConversionOptimizerComponent {
  meaning: string;
  quick_diagnosis?: {
    label: string;
    options: string[];
    logic: ComponentLogic;
  };
  final_cta: {
    label: string;
    description?: string;
    logic: ComponentLogic;
  };
}

export interface SystemIntegration {
  tracking?: string;
  ab_testing?: string;
  data_feed?: string;
}

/**
 * Complete MyVision LP Structure
 */
export interface MyVisionLPStructure {
  metadata: LPMetadata;
  pattern: LPPattern;

  // Component Layers
  hero_section: HeroComponent;
  trust_builder: TrustBuilderComponent;
  service_differentiation: ServiceDifferentiationComponent;
  success_data_repository?: SuccessDataComponent;
  conversion_optimizer: ConversionOptimizerComponent;

  // System Integration
  system_integration?: SystemIntegration;
}

/**
 * Predefined Pattern Templates
 */
export const PATTERN_TEMPLATES: Record<LPPatternType, Partial<MyVisionLPStructure>> = {
  brand_general_standard: {
    pattern: {
      id: 'brand_general_standard',
      target: 'Wide (Potential & Experienced)',
      logic_flow: 'trust_logic_social_action',
      description: '信頼醸成→論理的説得→社会的証明→行動喚起の流れで、幅広い層に訴求',
    },
    hero_section: {
      meaning: '瞬間的な関心喚起とブランドイメージの定着',
      catchphrase: {
        content: '最高の仕事が最高の人生をつくる',
        logic: 'benefit_driven',
      },
      key_metric_salary: {
        value: '平均年収UP額 122万円',
        logic: 'anchoring_effect',
      },
      social_proof_count: {
        value: '累計支援実績 8,000名以上',
        logic: 'bandwagon_effect',
      },
      trust_indicator_rating: {
        value: 4.8,
        source: 'Google口コミ',
        logic: 'social_proof',
      },
      primary_cta: {
        text: '30秒で完了 無料転職相談',
        link: '#contact',
        logic: 'low_hurdle',
      },
    },
  },

  inexperienced_education: {
    pattern: {
      id: 'inexperienced_education',
      target: 'Consulting Inexperienced (20s-30s)',
      logic_flow: 'problem_solution_support_action',
      description: '不安の可視化→市場背景の説明→対策の提示→行動喚起で、未経験者の心理障壁を除去',
    },
    hero_section: {
      meaning: '未経験者の不安を受け止め、可能性を提示',
      catchphrase: {
        content: 'コンサル未経験でも大丈夫。あなたの経験が活きる',
        logic: 'empathy_trigger',
      },
      primary_cta: {
        text: '未経験からの転職相談',
        link: '#contact',
        logic: 'low_hurdle',
      },
    },
    service_differentiation: {
      meaning: '選考対策の体系化による内定可能性の提示',
      proprietary_materials: {
        items: ['フェルミ推定対策資料', 'ケース面接頻出問答集', '業界別想定質問リスト'],
        logic: 'productization',
      },
      mock_interviews: {
        description: '元コンサルタントによる無制限の模擬面接',
        unlimited: true,
        logic: 'skill_acquisition',
      },
    },
  },

  event_speed_selection: {
    pattern: {
      id: 'event_speed_selection',
      target: 'Active Job Seekers',
      logic_flow: 'opportunity_efficiency_action',
      description: '限定性の強調→効率性の訴求→簡単な参加→即行動の流れで、高CVを実現',
    },
    hero_section: {
      meaning: 'スピード感と特別感を前面に押し出した訴求',
      catchphrase: {
        content: '【限定30名】1Day選考会 - その日に内定が決まる',
        logic: 'urgency_scarcity',
      },
      primary_cta: {
        text: '今すぐ選考会に申し込む',
        link: '#register',
        logic: 'urgency_scarcity',
      },
    },
  },
};

/**
 * Content Strategy Hints based on Pattern
 */
export interface ContentStrategyHint {
  pattern: LPPatternType;
  priority_sections: string[];
  tone: string;
  key_messages: string[];
}

export const CONTENT_STRATEGY_HINTS: Record<LPPatternType, ContentStrategyHint> = {
  brand_general_standard: {
    pattern: 'brand_general_standard',
    priority_sections: ['hero', 'trust_builder', 'service_differentiation', 'success_cases', 'conversion'],
    tone: '専門的かつ信頼性重視。ファクトベースで論理的。',
    key_messages: [
      '業界No.1の実績と信頼',
      '200社以上のファームとのネットワーク',
      '元戦略ファーム出身のプロフェッショナル',
      '平均年収122万円アップの実績',
    ],
  },
  inexperienced_education: {
    pattern: 'inexperienced_education',
    priority_sections: ['hero', 'market_context', 'anxiety_resolution', 'selection_support', 'success_cases'],
    tone: '共感的で教育的。不安を理解し、丁寧に解説。',
    key_messages: [
      '未経験者の9割が内定獲得',
      'SE・営業経験が活かせる',
      'フェルミ推定も基礎から対策',
      '業界の成長性とDX需要',
    ],
  },
  event_speed_selection: {
    pattern: 'event_speed_selection',
    priority_sections: ['hero', 'event_details', 'efficiency', 'simple_entry'],
    tone: 'ダイレクトで行動喚起的。締切と限定性を強調。',
    key_messages: [
      '1日で選考完結',
      'CEO直接登壇',
      '限定30名のみ',
      '締切まで残りわずか',
    ],
  },
};
