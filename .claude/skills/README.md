# Claude Code Skills - LP Generator

このディレクトリには、LP Generator用のClaude Codeスキルが含まれています。

## 利用可能なスキル

### 1. `/lp-generator` - LP生成

MyVisionのLP構造分析に基づいた、オーケストレーター型ランディングページ生成システム

**使用例:**
```
/lp-generator --quick
/lp-generator --experience inexperienced
/lp-generator --goal "IT業界向け転職サービス" --pattern inexperienced_education
```

**機能:**
- 3つのLPパターン（ブランド総合型、未経験特化型、イベント誘導型）
- 自動パターン選定
- コピー自動生成
- 心理トリガー活用

### 2. `/lp-export` - 設定エクスポート

生成したLP構造をYAML/JSON形式でエクスポート

**使用例:**
```
/lp-export --format yaml
/lp-export --format json --output config/lp-v1.json
```

**機能:**
- YAML/JSON形式のエクスポート
- バージョン管理対応
- 設定の再利用

## クイックスタート

### 1. 依存関係のインストール

```bash
cd lp-generator
npm install
```

### 2. スキルの実行

Claude Codeで以下のコマンドを実行:

```
/lp-generator --quick
```

### 3. 結果の確認

生成されたLPの構造とコピーが表示されます。

## スキルの仕組み

Claude Codeのスキルシステムは、`.claude/skills/` ディレクトリ内のMarkdownファイルを読み込み、スラッシュコマンドとして利用可能にします。

各スキルファイルには以下が含まれます:
- スキルの説明
- 使用方法
- 実行手順
- エラーハンドリング

## ワークフロー例

### 基本的なLP生成フロー

1. **LP生成**
   ```
   /lp-generator --quick
   ```

2. **設定をYAMLにエクスポート**
   ```
   /lp-export --format yaml --output output/my-lp.yaml
   ```

3. **カスタマイズして再生成**
   - YAMLファイルを編集
   - 編集したYAMLを読み込んで再生成（future feature）

### 未経験者向けLP生成フロー

1. **未経験者向けパターンで生成**
   ```
   /lp-generator --experience inexperienced --pattern inexperienced_education
   ```

2. **結果を確認**
   - キャッチフレーズ: "コンサル未経験でも大丈夫。あなたの経験が活きる"
   - CTA: "未経験からの転職相談"

3. **設定をエクスポート**
   ```
   /lp-export --format yaml --output output/inexperienced-lp.yaml
   ```

### イベント誘導型LP生成フロー

1. **イベント特化パターンで生成**
   ```
   /lp-generator --pattern event_speed_selection --goal "1Day選考会への誘導"
   ```

2. **結果を確認**
   - キャッチフレーズ: "【限定30名】1Day選考会 - その日に内定が決まる"
   - CTA: "今すぐ選考会に申し込む"

## トラブルシューティング

### スキルが認識されない

```bash
# .claude/skills/ ディレクトリが存在することを確認
ls -la .claude/skills/

# スキルファイルの権限を確認
chmod 644 .claude/skills/*.md
```

### 依存関係エラー

```bash
# lp-generator ディレクトリで依存関係をインストール
cd lp-generator
npm install
```

### TypeScriptエラー

```bash
# TypeScriptとtsx が正しくインストールされているか確認
cd lp-generator
npm list typescript tsx

# 型チェック
npm run type-check
```

## 詳細ドキュメント

- **[完全ガイド](../../docs/claude-code-lp-generator-guide.md)** - 詳細な使用方法、APIリファレンス
- **[LP Generator README](../../lp-generator/README.md)** - システムの概要
- **[Design Tokens](../../lp-generator/src/styles/design-tokens.css)** - デザインシステム

## スキルの追加

新しいスキルを追加するには、`.claude/skills/` ディレクトリに新しいMarkdownファイルを作成します。

**テンプレート:**
```markdown
# Skill Name

**Description**: Brief description

## Overview
...

## Usage
...

## Execution Instructions
...
```

## サポート

問題が発生した場合は、プロジェクトのIssueを作成してください。

---

**Built with ❤️ for Claude Code**
