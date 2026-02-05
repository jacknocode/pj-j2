# LP Generator Skill

**Description**: MyVisionのLP構造分析に基づいた、オーケストレーター型ランディングページ生成システム

## Overview

このスキルは、以下の機能を提供します：

- **3つのLPパターン**: ブランド総合型、未経験特化型、イベント誘導型
- **自動パターン選定**: ターゲットオーディエンスに応じた最適なパターン
- **コピー自動生成**: キャッチフレーズ、CTA、セクション見出し
- **心理トリガー活用**: 15種類の心理効果を戦略的に配置
- **YAML/JSONエクスポート**: 設定の保存と再利用

## Usage

### Basic Command

```
/lp-generator
```

### Options

ユーザーが以下のいずれかのオプションを指定できます：

- **--quick**: クイックモード（デフォルト設定で即座に生成）
- **--experience [level]**: ターゲットの経験レベル
  - `experienced`: 経験者向け
  - `inexperienced`: 未経験者向け
  - `mixed`: 混在（デフォルト）
- **--pattern [type]**: LP パターンを強制指定
  - `brand_general_standard`: ブランド総合型
  - `inexperienced_education`: 未経験者教育型
  - `event_speed_selection`: イベント誘導型
- **--goal [text]**: ビジネスゴールの説明
- **--verbose**: 詳細な出力

## Examples

### 例1: クイック生成（デフォルト）

```
/lp-generator --quick
```

→ デフォルト設定でブランド総合型LPを生成

### 例2: 未経験者向けLP生成

```
/lp-generator --experience inexperienced --quick
```

→ 未経験者向けパターンで生成

### 例3: カスタム設定

```
/lp-generator --goal "IT業界向け転職サービス" --experience inexperienced --pattern inexperienced_education
```

→ IT業界向け、未経験者特化のLPを生成

## Execution Instructions

When this skill is invoked:

1. **Parse user options** from the command arguments
2. **Change directory** to `lp-generator/`
3. **Execute the skill** using one of these methods:

   **Method A: Direct npm script (recommended)**
   ```bash
   cd lp-generator
   npm run generate-lp:quick
   # or
   npm run generate-lp:inexperienced
   # or
   npm run generate-lp -- [options]
   ```

   **Method B: Direct TypeScript execution**
   ```bash
   cd lp-generator
   npx tsx src/skills/generate-lp-skill.ts [options]
   ```

4. **Display the results** to the user, including:
   - Selected LP pattern
   - Generated catchphrase
   - Primary CTA
   - Section headlines
   - Recommendations
   - Warnings (if any)

5. **Offer next steps**:
   - Export to YAML/JSON
   - Generate HTML
   - Customize content
   - Run A/B test variations

## Output Format

The skill should present results in a structured format:

```
✅ LP生成完了！

📈 戦略サマリー:
  パターン: [pattern name]
  理由: [rationale]

📝 生成されたコピー:
  キャッチフレーズ: "[catchphrase]"
  メインCTA: "[cta text]"

📑 セクション見出し:
  • [section]: "[headline]"
  • [section]: "[headline]"

💡 推奨事項:
  • [recommendation 1]
  • [recommendation 2]

⚠️  注意点: [warnings if any]

次のステップ:
1. YAMLにエクスポート: /lp-generator --export yaml
2. HTMLを生成
3. コンテンツをカスタマイズ
```

## Technical Details

- **Location**: `lp-generator/src/skills/generate-lp-skill.ts`
- **Dependencies**: `tsx`, `zod`, TypeScript
- **Agents used**:
  - Orchestrator Agent (統括)
  - Content Strategy Agent (戦略立案)
  - Copywriting Agent (コピー生成)

## Patterns

### Brand General Standard
- **対象**: 幅広い層（経験者・未経験者混在）
- **フロー**: 信頼→論理→社会的証明→行動
- **キーメッセージ**: 平均年収122万円UP、8,000名以上の支援実績

### Inexperienced Education
- **対象**: コンサル業界未経験者
- **フロー**: 問題/不安→解決策→サポート証明→行動
- **キーメッセージ**: 未経験者の9割が内定、フェルミ推定も基礎から対策

### Event Speed Selection
- **対象**: 能動的な求職者
- **フロー**: 限定性→効率性→簡単参加→行動
- **キーメッセージ**: 【限定30名】1Day選考会、通常3ヶ月が1日で完了

## Error Handling

If execution fails:
1. Check if dependencies are installed: `cd lp-generator && npm install`
2. Verify TypeScript is available: `npx tsx --version`
3. Check file permissions
4. Display error message with troubleshooting steps

## Related Commands

- `/lp-generator --export yaml`: YAML形式でエクスポート
- `/lp-generator --export json`: JSON形式でエクスポート
- `/lp-generator --help`: ヘルプを表示

## References

- [完全ガイド](../../docs/claude-code-lp-generator-guide.md)
- [README](../../lp-generator/README.md)
- [Design Tokens](../../lp-generator/src/styles/design-tokens.css)
