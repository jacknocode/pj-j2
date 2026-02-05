/**
 * Copywriting Agent
 *
 * Role: 説得力のある見出しと文言を生成
 * - ターゲットに響くキャッチコピー
 * - 行動喚起（CTA）の最適化
 * - 論理的な説得構造の文章化
 * - 心理トリガーを活用した文言
 */

import type { LPPatternType, ComponentLogic } from '../types/myvision-lp-patterns';

export interface CopyRequest {
  section: string;
  purpose: string;
  logic: ComponentLogic;
  context?: {
    pattern: LPPatternType;
    target_audience?: string;
    key_message?: string;
  };
}

export interface GeneratedCopy {
  primary: string;
  alternatives: string[];
  rationale: string;
  psychological_triggers: string[];
}

export class CopywritingAgent {
  /**
   * ヒーローセクションのキャッチフレーズを生成
   */
  generateHeroCatchphrase(
    pattern: LPPatternType,
    context: {
      company_value?: string;
      target_pain_point?: string;
      unique_strength?: string;
    }
  ): GeneratedCopy {
    const templates: Record<LPPatternType, GeneratedCopy> = {
      brand_general_standard: {
        primary: '最高の仕事が最高の人生をつくる',
        alternatives: [
          'データとサイエンスで、あなたのキャリアを次のステージへ',
          '戦略ファーム出身のプロが、あなたの転職を成功へ導く',
          '業界No.1の実績。年収122万円アップを実現',
        ],
        rationale:
          'MyVisionのコアバリュー「最高の仕事が最高の人生をつくる」を前面に出し、キャリアを通じた人生の質向上という、ターゲットの根源的な欲求に訴求。',
        psychological_triggers: ['self_actualization', 'aspiration', 'life_transformation'],
      },
      inexperienced_education: {
        primary: 'コンサル未経験でも大丈夫。あなたの経験が活きる',
        alternatives: [
          '異業種からコンサルへ。9割が未経験からのスタートです',
          'SE・営業経験があれば、コンサルタントになれる',
          '未経験でも内定率78%。徹底サポートで夢を実現',
        ],
        rationale:
          '未経験者の最大の心理的障壁である「自分にはできない」という不安を、冒頭で否定。「あなたの経験が活きる」で、過去のキャリアが無駄にならないことを保証。',
        psychological_triggers: ['anxiety_relief', 'empathy', 'past_validation'],
      },
      event_speed_selection: {
        primary: '【限定30名】1Day選考会 - その日に内定が決まる',
        alternatives: [
          '通常3ヶ月の選考が1日で完結。特別選考会のご案内',
          '今だけ。CEOと直接話せる限定イベント（残り枠わずか）',
          '締切間近：1日で複数社の内定を獲得するチャンス',
        ],
        rationale:
          '限定性（30名）とスピード感（1Day）を【】で視覚的に強調。「その日に内定が決まる」で、通常では得られない特別な体験を約束。',
        psychological_triggers: ['scarcity', 'urgency', 'fomo', 'efficiency'],
      },
    };

    const base = templates[pattern];

    // コンテキストに応じたカスタマイズ
    if (context.unique_strength) {
      base.alternatives.push(`${context.unique_strength}で、理想のキャリアを実現`);
    }

    return base;
  }

  /**
   * CTAボタンのコピーを生成
   */
  generateCTA(
    pattern: LPPatternType,
    ctaType: 'primary' | 'secondary',
    context?: {
      action?: string;
      benefit?: string;
    }
  ): GeneratedCopy {
    const ctaTemplates: Record<LPPatternType, Record<'primary' | 'secondary', GeneratedCopy>> = {
      brand_general_standard: {
        primary: {
          primary: '30秒で完了 無料転職相談',
          alternatives: [
            '今すぐ無料相談を始める',
            '無料でキャリア診断を受ける（30秒）',
            'プロに相談してみる（完全無料）',
          ],
          rationale: '「30秒」で時間的ハードルを極限まで下げ、「無料」でリスクゼロを強調。',
          psychological_triggers: ['low_hurdle', 'risk_reversal', 'instant_gratification'],
        },
        secondary: {
          primary: 'サービス資料をダウンロード',
          alternatives: ['まずは資料を見てみる', '詳細資料を無料で入手', '事例集を見る（無料）'],
          rationale: 'いきなり登録に抵抗がある層向けのマイクロコンバージョン。',
          psychological_triggers: ['micro_commitment', 'information_gathering'],
        },
      },
      inexperienced_education: {
        primary: {
          primary: '未経験からの転職相談',
          alternatives: [
            '無料で適性診断を受ける',
            'まずは話を聞いてみる（無料）',
            '未経験者向け資料をもらう',
          ],
          rationale: '「未経験からの」を明示し、自分ごと化。「相談」という軽いアクションで心理的ハードルを下げる。',
          psychological_triggers: ['empathy', 'low_hurdle', 'exploratory'],
        },
        secondary: {
          primary: '未経験者の成功事例を見る',
          alternatives: [
            '選考対策の詳細を知る',
            'フェルミ推定対策資料を見る',
            '業界解説動画を視聴（無料）',
          ],
          rationale: '教育コンテンツへの誘導で、まず知識を得たいというニーズに応える。',
          psychological_triggers: ['education', 'proof', 'low_commitment'],
        },
      },
      event_speed_selection: {
        primary: {
          primary: '今すぐ選考会に申し込む',
          alternatives: [
            '限定枠に今すぐエントリー',
            '【残りわずか】選考会に参加する',
            '1Day選考会に申し込む（無料）',
          ],
          rationale: '「今すぐ」で即時性、「申し込む」で具体的なアクションを明示。躊躇する余地を与えない。',
          psychological_triggers: ['urgency', 'scarcity', 'direct_action'],
        },
        secondary: {
          primary: 'イベント詳細を確認する',
          alternatives: ['開催スケジュールを見る', '過去の参加者の声を見る', 'よくある質問を見る'],
          rationale: 'いきなり申込に抵抗がある層向けに、まず詳細確認の導線を用意。',
          psychological_triggers: ['information_gathering', 'risk_mitigation'],
        },
      },
    };

    const result = ctaTemplates[pattern][ctaType];

    // カスタムコンテキストがあれば反映
    if (context?.action && context?.benefit) {
      result.alternatives.push(`${context.action}（${context.benefit}）`);
    }

    return result;
  }

  /**
   * 統計データの訴求文を生成
   */
  generateStatisticsCopy(
    metric: {
      value: string | number;
      unit?: string;
      context: string;
    },
    logic: ComponentLogic
  ): GeneratedCopy {
    const value = typeof metric.value === 'number' ? metric.value.toLocaleString('ja-JP') : metric.value;
    const displayValue = metric.unit ? `${value}${metric.unit}` : value;

    const templates: Record<string, GeneratedCopy> = {
      salary_increase: {
        primary: `平均年収UP額 ${displayValue}`,
        alternatives: [
          `${displayValue} 年収がアップ`,
          `平均${displayValue}の収入増を実現`,
          `転職で${displayValue}の年収向上`,
        ],
        rationale:
          '年収アップ額を前面に出し、転職の経済的メリットを即座に理解させる。「平均」で実現可能性を示す。',
        psychological_triggers: ['anchoring_effect', 'financial_benefit', 'aspiration'],
      },
      support_count: {
        primary: `累計支援実績 ${displayValue}`,
        alternatives: [
          `${displayValue}以上の転職を支援`,
          `これまでに${displayValue}が利用`,
          `${displayValue}の転職成功実績`,
        ],
        rationale: '圧倒的な支援数で、業界での確固たる地位と信頼性を示す。',
        psychological_triggers: ['bandwagon_effect', 'social_proof', 'authority'],
      },
      rating: {
        primary: `Google口コミ ${displayValue}`,
        alternatives: [
          `利用者満足度 ${displayValue}`,
          `${displayValue} の高評価`,
          `口コミ評価 ${displayValue}/5.0`,
        ],
        rationale: '第三者評価（Google）による客観的な満足度を提示し、サービス品質を保証。',
        psychological_triggers: ['social_proof', 'third_party_validation', 'trust'],
      },
      success_rate: {
        primary: `内定獲得率 ${displayValue}`,
        alternatives: [
          `${displayValue}が内定を獲得`,
          `成功率 ${displayValue}`,
          `${displayValue}の利用者が転職成功`,
        ],
        rationale: '高い成功率で、サービスの実効性を証明。「自分も成功できる」という期待を醸成。',
        psychological_triggers: ['proof', 'confidence', 'expectation'],
      },
    };

    return (
      templates[metric.context] || {
        primary: `${displayValue}`,
        alternatives: [],
        rationale: 'カスタムメトリクスの表示',
        psychological_triggers: ['value_prop_quantitative'],
      }
    );
  }

  /**
   * セクション見出しを生成
   */
  generateSectionHeadline(
    section: string,
    pattern: LPPatternType,
    purpose?: string
  ): GeneratedCopy {
    const headlines: Record<string, Record<LPPatternType, GeneratedCopy>> = {
      trust_builder: {
        brand_general_standard: {
          primary: 'MyVisionが選ばれる理由',
          alternatives: [
            '業界トップクラスの実績とネットワーク',
            '200社以上のファームとのコネクション',
            '圧倒的な支援実績',
          ],
          rationale: '競合との差別化ポイントを明確にし、なぜMyVisionを選ぶべきかを提示。',
          psychological_triggers: ['differentiation', 'authority', 'social_proof'],
        },
        inexperienced_education: {
          primary: '未経験者を成功に導く、3つの強み',
          alternatives: [
            'なぜ未経験でも内定が取れるのか',
            '徹底サポートで不安を解消',
            '未経験者支援No.1の実績',
          ],
          rationale: '未経験者にフォーカスした見出しで、自分ごと化を促進。',
          psychological_triggers: ['empathy', 'confidence', 'proof'],
        },
        event_speed_selection: {
          primary: '1Day選考会だからできること',
          alternatives: [
            'なぜ1日で内定が決まるのか',
            '特別選考会の3つのメリット',
            '通常選考との違い',
          ],
          rationale: 'イベントの特別性と効率性を強調。',
          psychological_triggers: ['efficiency', 'exclusivity', 'differentiation'],
        },
      },
      service_differentiation: {
        brand_general_standard: {
          primary: '業界最高水準の選考対策',
          alternatives: [
            '内定獲得までの完全サポート',
            '戦略ファーム出身のプロによる徹底指導',
            'データに基づいた選考対策',
          ],
          rationale: '選考対策の質の高さを強調し、競合エージェントとの差別化。',
          psychological_triggers: ['expertise', 'quality', 'success_assurance'],
        },
        inexperienced_education: {
          primary: '未経験者のための選考対策プログラム',
          alternatives: [
            'フェルミ推定・ケース面接を基礎から',
            '合格まで導く体系的サポート',
            '100ページ超の対策資料を無料提供',
          ],
          rationale: '未経験者の最大の不安である選考への対策を、体系的に提供することを明示。',
          psychological_triggers: ['anxiety_relief', 'productization', 'comprehensiveness'],
        },
        event_speed_selection: {
          primary: '選考会当日の流れ',
          alternatives: [
            '1日で完結するスケジュール',
            '効率的な選考プロセス',
            '参加から内定までの道のり',
          ],
          rationale: '具体的なプロセスを示すことで、参加の心理的ハードルを下げる。',
          psychological_triggers: ['transparency', 'clarity', 'low_hurdle'],
        },
      },
      success_cases: {
        brand_general_standard: {
          primary: '転職成功事例',
          alternatives: [
            '直近の支援実績',
            'あなたと同じ境遇の成功者たち',
            '年齢・業界別の転職事例',
          ],
          rationale: '具体的な事例で、「自分も成功できる」という確信を与える。',
          psychological_triggers: ['similarity_matching', 'proof', 'aspiration'],
        },
        inexperienced_education: {
          primary: '未経験からの転職成功ストーリー',
          alternatives: [
            '他業界から憧れのコンサルへ',
            'SE・営業出身者の成功事例',
            '20代で年収800万円を実現した理由',
          ],
          rationale: '未経験者に特化した事例で、実現可能性を具体的に示す。',
          psychological_triggers: ['empathy', 'similarity_matching', 'aspiration'],
        },
        event_speed_selection: {
          primary: '過去の参加者の声',
          alternatives: [
            '1Day選考会で内定を獲得した方々',
            '参加者の満足度95%',
            '実際に転職を決めた理由',
          ],
          rationale: '過去の成功例で、イベントの価値を証明。',
          psychological_triggers: ['social_proof', 'testimonial', 'success_visualization'],
        },
      },
    };

    const sectionHeadlines = headlines[section];
    if (!sectionHeadlines) {
      return {
        primary: purpose || section,
        alternatives: [],
        rationale: 'デフォルトの見出し',
        psychological_triggers: [],
      };
    }

    return sectionHeadlines[pattern];
  }

  /**
   * 説明文を生成
   */
  generateDescriptionCopy(
    topic: string,
    pattern: LPPatternType,
    context?: {
      benefit?: string;
      proof_point?: string;
    }
  ): GeneratedCopy {
    // 基本的な説明文のテンプレート
    const templates: Record<string, string> = {
      selection_support:
        'フェルミ推定、ケース面接、志望動機まで、コンサル選考に特化した対策プログラムを提供。元戦略ファーム出身のコンサルタントが、合格まで徹底的にサポートします。',
      network:
        '戦略ファーム、総合ファーム、ブティック系まで、200社以上のコンサルティングファームと強固なパートナーシップを構築。あなたの志向に合った最適な求人を紹介します。',
      advisor:
        'BCG、デロイト、アクセンチュアなど、トップファーム出身のコンサルタントが在籍。現場で培った実践的な知見をもとに、的確なアドバイスを提供します。',
    };

    return {
      primary: templates[topic] || `${topic}に関する詳細な説明文。`,
      alternatives: [],
      rationale: `${topic}に関する説得力のある説明を提供`,
      psychological_triggers: ['expertise', 'trust', 'comprehensiveness'],
    };
  }
}

// Singleton instance
export const copywritingAgent = new CopywritingAgent();
