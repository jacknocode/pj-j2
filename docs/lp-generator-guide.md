# LP Generator Agent 使用ガイド

## 概要

LP Generator Agentは、MyVisionのデザインシステムに基づいたランディングページを自動生成するAIエージェントです。Claude Code用のエージェントとしても使用できます。

## セットアップ

### 1. 依存関係のインストール

```bash
# メインプロジェクト
npm install

# LP Generator（Viteでプレビューする場合）
cd lp-generator
npm install
cd ..
```

### 2. 環境変数の設定

`.env` ファイルにOpenAI APIキーを設定してください：

```
OPENAI_API_KEY=sk-...
```

## 使用方法

### Mastra CLI経由

```bash
npm run dev
```

Mastraの管理画面（通常は http://localhost:3000）にアクセスし、`lpGeneratorAgent` を選択します。

### エージェントとの対話例

#### 例1: シンプルなLP生成

```
あなた: ハイクラス転職サービスのLPを作りたいです

エージェント: かしこまりました。ハイクラス転職サービスのLPを作成いたします。
以下の情報を教えていただけますか？

1. サービス名
2. メインとなる価値提案（例: "最高の仕事が最高の人生をつくる"）
3. 主な実績やデータ（年収アップ率、成功事例数など）
4. ターゲット職種（コンサル、金融、ITなど）

あなた: サービス名は「MyVision」で、コンサル・金融向けです。
年収アップ率92%、平均138万円のアップ実績があります。

エージェント: 素晴らしいですね。それでは、以下の構成でLPを作成します：

- Hero: "最高の仕事が最高の人生をつくる" をヘッドライン
- Statistics: 年収アップ率92%、平均増加額138万円
- Features: データ駆動型マッチング、業界特化の専門性、100%年収交渉成功
- Steps: サービス利用の5ステップ
- CTA: "無料転職相談を予約する"

よろしいでしょうか？

あなた: はい、お願いします

エージェント: [lpGeneratorToolを実行]

LPを生成しました！
ファイルは output/landing-page.html に保存されています。
```

#### 例2: カスタム要件を持つLP

```
あなた: ITエンジニア向けの転職サービスLPを作りたいです。
メガベンチャー企業の求人が強みで、100%の年収交渉成功率が特徴です。
お客様の声も3件入れたいです。

エージェント: ITエンジニア向けの転職サービスLPですね。
以下の内容で作成いたします：

**サービス名**: TechGo（仮）
**ターゲット**: ITエンジニア
**強み**:
- メガベンチャー企業の求人多数
- 100%の年収交渉成功率
- ISMS認証取得（セキュリティ重視）

**構成**:
1. Hero: "エンジニアのキャリアを次のステージへ"
2. Statistics: 年収交渉成功率100%、平均年収アップ150万円
3. Features: メガベンチャー求人、専門アドバイザー、スキル診断
4. Testimonials: 3名のお客様の声（仮の内容を含む）
5. Steps: サービス利用フロー

お客様の声の具体的な内容はありますか？それとも仮の内容で進めますか？

あなた: 仮の内容で進めてください

エージェント: [lpGeneratorToolを実行]

LPを生成しました！output/landing-page.html に保存されています。
```

## プログラマティックな使用

TypeScriptコードから直接ツールを使用することもできます：

```typescript
import { mastra } from './src/mastra';

const result = await mastra.agents.lpGeneratorAgent.generate({
  title: 'ハイクラス転職なら | MyVision',
  description: '最高の仕事が最高の人生をつくる',
  headline: '最高の仕事が最高の人生をつくる',
  heroDescription: 'データとサイエンスで、あなたのキャリアを次のステージへ',
  ctaText: '無料転職相談を予約する',
  ctaLink: '#contact',
  includeStatistics: true,
  statistics: [
    { number: '92%', label: '年収アップ率', description: '転職成功者の9割以上' },
    { number: '138万円', label: '平均年収増加額', description: '業界トップクラスの交渉力' },
  ],
  includeFeatures: true,
  featuresTitle: 'MyVisionが選ばれる理由',
  features: [
    {
      icon: '📊',
      title: 'データ駆動型マッチング',
      description: '独自のアルゴリズムで精密にマッチング',
    },
  ],
  finalCtaHeadline: '今すぐ無料相談を始めませんか？',
  companyName: '株式会社MyVision',
});
```

## 出力ファイル

生成されたLPは以下の場所に保存されます：

```
output/landing-page.html
```

このファイルは：
- 完全にスタンドアロンで動作（外部依存なし）
- レスポンシブデザイン対応
- MyVisionデザインシステムを適用済み
- そのままブラウザで開いて確認可能

## カスタマイズ

### デザイントークンの変更

`lp-generator/src/styles/design-tokens.css` を編集して、ブランドカラーやフォントを変更できます。

### テンプレートの追加

新しいセクションタイプを追加する場合：

1. `lp-generator/src/types/lp-config.ts` に型を追加
2. `lp-generator/src/templates/landing-page.ts` に生成関数を追加
3. `src/mastra/tools/lpGeneratorTool.ts` のスキーマを更新

## トラブルシューティング

### エージェントが応答しない

- OpenAI APIキーが正しく設定されているか確認
- `npm run dev` が正常に起動しているか確認

### 生成されたHTMLが表示されない

- `output/` ディレクトリが作成されているか確認
- ファイルパーミッションを確認

### デザインが崩れる

- ブラウザのキャッシュをクリア
- `design-tokens.css` が正しくロードされているか開発者ツールで確認

## ベストプラクティス

1. **段階的に情報を提供**: エージェントとの対話では、一度にすべての情報を提供する必要はありません
2. **フィードバックを活用**: 生成されたLPを確認し、修正が必要な場合はエージェントに伝えましょう
3. **実績データを強調**: 統計セクションは信頼性を高める重要な要素です
4. **CTAを明確に**: 行動喚起は具体的で魅力的なものにしましょう

## 今後の拡張

- [ ] 複数のデザインテーマ対応
- [ ] A/Bテスト用のバリエーション生成
- [ ] 画像・動画の自動配置
- [ ] フォーム統合（リード獲得）
- [ ] アナリティクス統合

## サポート

質問や問題がある場合は、プロジェクトのIssueを作成してください。
