/**
 * MyVision LP Generator - Main Entry Point & Demo
 *
 * Orchestrator-based LP generation system with sub-agents and skills
 *
 * Demos:
 * 1. Quick generation for different patterns
 * 2. Export to YAML/JSON
 * 3. HTML generation with MyVision design tokens
 */

import { lpOrchestratorAgent } from './agents/orchestrator';
import { exportConfigSkill } from './skills/export-config-skill';
import { generateLandingPage } from './templates/landing-page';
import type { LPConfig } from './types/lp-config';

// Sample MyVision-style LP configuration
const sampleConfig: LPConfig = {
  meta: {
    title: 'ハイクラス転職なら | MyVision',
    description: '最高の仕事が最高の人生をつくる。コンサル・金融業界特化の転職エージェント',
    keywords: ['転職', 'ハイクラス', 'コンサル', '金融', 'キャリア'],
  },
  hero: {
    headline: '最高の仕事が最高の人生をつくる',
    subheadline: 'コンサル・金融業界特化の転職エージェント',
    description: 'データとサイエンスで、あなたのキャリアを次のステージへ。徹底した仕組み化により、最適なキャリアパスをご提案します。',
    ctaText: '無料転職相談を予約する',
    ctaLink: '#contact',
    secondaryCtaText: '詳しく見る',
    secondaryCtaLink: '#features',
  },
  statistics: {
    title: '圧倒的な実績',
    stats: [
      {
        number: '92%',
        label: '年収アップ率',
        description: '転職成功者の9割以上が年収アップを実現',
      },
      {
        number: '138万円',
        label: '平均年収増加額',
        description: '業界トップクラスの交渉力',
      },
      {
        number: '95%',
        label: '定着率',
        description: '入社後も長期的にキャリアをサポート',
      },
    ],
  },
  features: {
    title: 'MyVisionが選ばれる理由',
    subtitle: 'データとサイエンスによる転職体験のアップデート',
    features: [
      {
        icon: '📊',
        title: 'データ駆動型マッチング',
        description: '独自のアルゴリズムにより、あなたのスキルと企業ニーズを精密にマッチング。業界最高水準の適合率を実現しています。',
      },
      {
        icon: '🎯',
        title: '業界特化の専門性',
        description: 'コンサル・金融業界出身のキャリアアドバイザーが、業界特有の選考対策から入社後のキャリアまで徹底サポート。',
      },
      {
        icon: '💼',
        title: '100%年収交渉成功',
        description: '徹底した市場調査と交渉ノウハウにより、全ての転職者の年収交渉を成功に導きます。',
      },
    ],
  },
  steps: {
    title: 'ご利用の流れ',
    subtitle: '登録から内定まで、5つのステップでサポート',
    steps: [
      {
        number: 1,
        title: 'キャリア相談',
        description: '現在のキャリアやご希望を詳しくヒアリング。最適なキャリアプランをご提案します。',
      },
      {
        number: 2,
        title: '求人紹介',
        description: 'あなたの経験とスキルにマッチした、厳選求人をご紹介。非公開求人も多数ご用意しています。',
      },
      {
        number: 3,
        title: '選考対策',
        description: '書類添削から模擬面接まで、内定獲得に向けた徹底的な選考対策を実施します。',
      },
      {
        number: 4,
        title: '内定・条件交渉',
        description: '年収や入社時期など、あなたに代わって企業と条件交渉。最適な条件での入社をサポートします。',
      },
      {
        number: 5,
        title: '入社・アフターフォロー',
        description: '入社後もキャリアアドバイザーが継続的にフォロー。長期的なキャリア形成をサポートします。',
      },
    ],
  },
  testimonials: {
    title: 'ご利用者様の声',
    subtitle: '実際にMyVisionで転職された方の体験談',
    testimonials: [
      {
        name: '山田太郎',
        role: 'シニアコンサルタント',
        company: '外資系コンサルティングファーム',
        content: 'データに基づいた的確なアドバイスと、業界に精通したキャリアアドバイザーのサポートにより、希望通りの転職が実現できました。年収も200万円以上アップし、大変満足しています。',
      },
      {
        name: '佐藤花子',
        role: 'マネージャー',
        company: '大手金融機関',
        content: '他のエージェントでは見つからなかった非公開求人を紹介いただき、理想のポジションに就くことができました。選考対策も丁寧で、自信を持って面接に臨めました。',
      },
      {
        name: '田中次郎',
        role: 'パートナー',
        company: '戦略コンサルティングファーム',
        content: '入社後のフォローまでしっかりしていて、長期的なキャリア形成をサポートしていただけます。単なる転職エージェントではなく、キャリアパートナーとして信頼しています。',
      },
    ],
  },
  cta: {
    headline: '今すぐ無料相談を始めませんか？',
    description: '30秒で完了。あなたのキャリアを次のステージへ。',
    ctaText: '無料転職相談を予約する',
    ctaLink: '#contact',
    backgroundColor: 'primary',
  },
  footer: {
    companyName: '株式会社MyVision',
    companyInfo: 'ハイクラス転職市場において、データとサイエンスによる革新的な転職体験を提供します。',
    links: [
      { text: '会社概要', url: '/about' },
      { text: 'サービス', url: '/services' },
      { text: '採用情報', url: '/careers' },
      { text: 'お問い合わせ', url: '/contact' },
      { text: 'プライバシーポリシー', url: '/privacy' },
    ],
  },
};

// Generate and display the LP
const html = generateLandingPage(sampleConfig);
document.write(html);
