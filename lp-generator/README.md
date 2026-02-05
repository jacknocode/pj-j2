# LP Generator - ランディングページ自動生成システム

MyVisionのデザイントークンに基づいたランディングページを自動生成するシステムです。

## 概要

**🎯 Claude Code用のオーケストレーター型LP生成エージェント**

このシステムは以下の要素で構成されています：

1. **デザイントークン**: MyVisionのブランドガイドラインに基づいた色、タイポグラフィ、スペーシングなどの定義
2. **テンプレートエンジン**: 構成に基づいてHTMLを生成するTypeScript関数
3. **オーケストレーターエージェント**: 複数のサブエージェントを統括し、LP生成フロー全体を管理
4. **サブエージェント**:
   - **Content Strategy Agent**: ターゲット分析とパターン選定
   - **Copywriting Agent**: 説得力のあるコピー生成
5. **スキル**: CLI/APIから実行可能な機能（generate-lp, export-config）

### 🚀 主要な特徴

- 🎯 **3つのLPパターン**: ブランド総合型、未経験特化型、イベント誘導型
- 🤖 **オーケストレーター型アーキテクチャ**: 複数のサブエージェントが協調して動作
- 📊 **データ駆動型アプローチ**: 心理トリガーとコンバージョン最適化
- 🔧 **スキルベース実行**: CLI/APIから柔軟に呼び出し可能

## MyVisionデザインシステム

### カラーパレット

- **Primary (Pegasus Red)**: `#E60012` - CTAボタン、重要な数値、ブランドアイデンティティ
- **Background**: `#FFFFFF` (白) - ページ背景
- **Section Divider**: `#F8F9FA` (ライトグレー) - セクション区切り
- **Text Primary**: `#333333` - メインテキスト
- **Text Secondary**: `#666666` - キャプション、補足情報

### デザイン哲学

> 最高の仕事が最高の人生をつくる

MyVisionのデザインは以下の原則に基づいています：

1. **情熱と行動**: 鮮やかな赤を使って行動を喚起
2. **明確性と信頼**: 白を基調とした清潔な印象
3. **データ駆動**: 具体的な数値で信頼性を構築
4. **プロフェッショナル**: 明確なタイポグラフィと適切な余白

## 使い方

### 1. CLIスキル（推奨）

```bash
# インストール
cd lp-generator
npm install

# クイックモード（デフォルト設定）
npm run generate-lp:quick

# 未経験者向けLP生成
npm run generate-lp:inexperienced

# カスタムオプション
npm run generate-lp -- --goal "IT業界向け転職サービス" --experience inexperienced --verbose
```

**出力例:**
```
🚀 LP Generator Skill - Starting...
⚡ Quick Mode enabled

✅ LP Generation Complete!

📈 Strategy Summary:
  Pattern: brand_general_standard
  Rationale: 幅広いターゲット層に対して、信頼性と実績を軸とした説得を行うため...

📝 Generated Copy:
  Hero Catchphrase: "最高の仕事が最高の人生をつくる"
  Primary CTA: "30秒で完了 無料転職相談"
```

### 2. プログラマティックAPI

```typescript
import { lpOrchestratorAgent } from './agents/orchestrator';

// シンプルな生成
const result = await lpOrchestratorAgent.quickGenerate(
  'ハイクラス転職支援',
  'experienced'
);

console.log(result.generated_copy.hero_catchphrase);
// => "最高の仕事が最高の人生をつくる"
```

### 3. スタンドアロン使用（Vite）

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開くと、サンプルLPが表示されます。

### 4. Mastraエージェント経由

```bash
# プロジェクトルートで
npm run dev
```

Mastraの管理画面から `lpGeneratorAgent` を選択し、対話形式でLPを生成できます。

## LP構成要素

生成されるLPは以下のセクションで構成されます：

### 必須セクション

- **Hero**: メインヘッドライン、説明文、CTAボタン
- **Final CTA**: ページ下部の行動喚起セクション
- **Footer**: 会社情報、リンク、著作権表示

### オプションセクション

- **Statistics**: 実績の数値表示（年収アップ率、成功事例数など）
- **Features**: サービスの特徴・強み（アイコン付き）
- **Steps**: サービス利用の流れ（STEP 1-5形式）
- **Testimonials**: ユーザーの声・成功事例

## 📚 LPパターン

オーケストレーターは、ターゲットオーディエンスに応じて最適なパターンを自動選定します。

### Pattern 1: Brand General Standard

**対象**: 幅広い層（経験者・未経験者混在）
**ロジックフロー**: 信頼→論理→社会的証明→行動
**キーメッセージ**:
- 平均年収UP額 122万円
- 累計支援実績 8,000名以上
- Google口コミ 4.8/5.0

### Pattern 2: Inexperienced Education

**対象**: コンサル業界未経験者
**ロジックフロー**: 問題/不安→解決策→サポート証明→行動
**キーメッセージ**:
- 未経験者の9割が内定獲得
- SE・営業経験が活かせる
- フェルミ推定も基礎から対策

### Pattern 3: Event Speed Selection

**対象**: 能動的な求職者
**ロジックフロー**: 限定性→効率性→簡単参加→行動
**キーメッセージ**:
- 【限定30名】1Day選考会
- 通常3ヶ月の選考が1日で完了
- CEO直接登壇

## 🏗️ アーキテクチャ

```
Orchestrator Agent (統括)
├── Content Strategy Agent    # ターゲット分析、パターン選定
├── Copywriting Agent          # 説得力のあるコピー生成
└── Design System Agent        # デザイントークンの適用

Skills (実行可能機能)
├── generate-lp               # LP生成のメインエントリーポイント
└── export-config             # YAML/JSONエクスポート
```

## ディレクトリ構造

```
lp-generator/
├── src/
│   ├── agents/                    # サブエージェント
│   │   ├── orchestrator.ts        # 統括エージェント
│   │   ├── content-strategy-agent.ts
│   │   └── copywriting-agent.ts
│   ├── skills/                    # 実行可能スキル
│   │   ├── generate-lp-skill.ts   # LP生成スキル
│   │   └── export-config-skill.ts # 設定エクスポートスキル
│   ├── templates/                 # HTMLテンプレート
│   │   └── landing-page.ts        # LP生成エンジン
│   ├── types/                     # TypeScript型定義
│   │   ├── lp-config.ts           # 汎用LP設定
│   │   └── myvision-lp-patterns.ts # MyVisionパターン定義
│   ├── styles/
│   │   └── design-tokens.css      # MyVisionデザイントークン
│   ├── index.ts                   # メインエクスポート
│   └── main.ts                    # デモ実行
├── output/                        # 生成ファイル出力先
├── index.html                     # Vite開発サーバー用
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## カスタマイズ

### デザイントークンの変更

`src/styles/design-tokens.css` を編集することで、色、フォント、スペーシングなどを変更できます。

```css
:root {
  --color-primary: #E60012;  /* メインカラーを変更 */
  --font-size-base: 1rem;    /* 基本フォントサイズを変更 */
  /* ... */
}
```

### テンプレートの拡張

`src/templates/landing-page.ts` の関数を編集・追加することで、新しいセクションやレイアウトを作成できます。

## 技術スタック

- **Vite**: 高速な開発サーバーとビルドツール
- **TypeScript**: 型安全なコード
- **Zod**: ランタイム型検証
- **Claude Code SDK**: オーケストレーター型エージェントフレームワーク
- **Mastra**: AIエージェント統合（オプショナル）

## 📖 ドキュメント

- **[完全ガイド](../docs/claude-code-lp-generator-guide.md)** - 詳細な使用方法、API リファレンス
- **[LP Generator使用ガイド](../docs/lp-generator-guide.md)** - 基本的な使用方法
- **[Design Tokens Reference](./src/styles/design-tokens.css)** - デザイントークン定義

## 🔍 心理トリガー一覧

オーケストレーターは、以下の心理トリガーを適切に配置します：

| Logic Type | 意味 | 使用例 |
|-----------|------|--------|
| `anchoring_effect` | アンカリング効果 | 平均年収122万円アップ |
| `bandwagon_effect` | バンドワゴン効果 | 8,000名以上が利用 |
| `social_proof` | 社会的証明 | Google口コミ 4.8 |
| `low_hurdle` | 心理的ハードル低下 | 30秒で完了 |
| `urgency_scarcity` | 緊急性・限定性 | 限定30名、締切間近 |
| `empathy_trigger` | 共感トリガー | 未経験者の成功事例 |
| `authority_proof` | 権威性の証明 | BCG出身アドバイザー |

## デザイントークン詳細

### スペーシング

```
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
--spacing-3xl: 64px
--spacing-4xl: 96px
--spacing-5xl: 128px
```

### フォントサイズ

```
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-2xl: 24px
--font-size-3xl: 30px
--font-size-4xl: 36px
--font-size-5xl: 48px
--font-size-6xl: 60px
```

### Border Radius

```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 24px
--radius-full: 9999px
```

## ベストプラクティス

1. **CTAは明確に**: 主要なアクションは必ずペガサスレッド（#E60012）のボタンで
2. **データで裏付ける**: 統計セクションで具体的な数値を示す
3. **ストーリーを語る**: ステップセクションで利用の流れを明確に
4. **社会的証明**: テスティモニアルで信頼性を高める
5. **モバイルファースト**: レスポンシブデザインを意識

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
