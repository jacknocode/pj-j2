# pj-j2

Mastra を利用したワークフロー開発用リポジトリです。実装を進める際は設計資料とタスク分解を確認してください。

## リポジトリ構成
- `src/` - Mastra のワークフローやツールを TypeScript で実装するコード群。
- `docs/` - 仕様やタスク、ワークフローの利用方法をまとめたドキュメント。
- `knowledge/` - 調査メモや設計検討の記録など、開発に役立つナレッジを蓄積する場所。

## ドキュメント
主要な設計資料は以下にあります。
- [要求仕様](docs/requirements.md)
- [仕様書](docs/spec.md)
- [タスク分解](docs/task.md)
- [ワークフロー説明](docs/workflow.md)

## セットアップ
OpenAI API を利用するため `OPENAI_API_KEY` を環境変数または `.env` に設定してください。

```text
OPENAI_API_KEY=sk-...
```

ワークフローの実行手順や例は [docs/workflow.md](docs/workflow.md) を参照してください。

設計に関する補足知識は [docs/knowledge/](docs/knowledge/) にまとめています。
