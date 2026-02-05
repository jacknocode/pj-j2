# pj-j2

Mastra を利用したワークフロー開発用リポジトリです。詳細な仕様やタスクは `docs/` ディレクトリを参照してください。

## 🚀 プロジェクト一覧

### 1. **LP Generator** - オーケストレーター型ランディングページ生成システム

MyVisionのLP構造分析に基づいた、Claude Code用の高度なLP自動生成エージェント。

**特徴:**
- 🎯 3つのLPパターン（ブランド総合型、未経験特化型、イベント誘導型）
- 🤖 オーケストレーター + サブエージェント アーキテクチャ
- 📊 心理トリガーとコンバージョン最適化
- 🔧 Claude Codeスラッシュコマンド対応

**クイックスタート:**
```bash
cd lp-generator
npm install
```

Claude Codeでスラッシュコマンドを使用:
```
/lp-generator --quick
/lp-generator --experience inexperienced
/lp-export --format yaml
```

**ドキュメント:**
- [完全ガイド](docs/claude-code-lp-generator-guide.md)
- [LP Generator README](lp-generator/README.md)
- [スキル一覧](.claude/skills/README.md)

---

## セットアップ

OpenAI API を利用するため `OPENAI_API_KEY` を環境変数または `.env` に設定してください。

```
OPENAI_API_KEY=sk-...
```

## 📚 ドキュメント

- **ワークフロー**: [docs/workflow.md](docs/workflow.md)
- **知識ベース**: [docs/knowledge/](docs/knowledge/)
- **LP Generator完全ガイド**: [docs/claude-code-lp-generator-guide.md](docs/claude-code-lp-generator-guide.md)

## 🎯 Claude Code スラッシュコマンド

このリポジトリには、Claude Code用のカスタムスキル（スラッシュコマンド）が含まれています。

### 利用可能なコマンド

| コマンド | 説明 | 例 |
|---------|------|-----|
| `/lp-generator` | LP生成 | `/lp-generator --quick` |
| `/lp-export` | 設定エクスポート | `/lp-export --format yaml` |

詳細は [.claude/skills/README.md](.claude/skills/README.md) を参照してください。
