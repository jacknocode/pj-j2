# 要求仕様

`docs/task.md` のタスクを完了した結果として満たすべき要求を記す。

- OpenAI API を利用するため `OPENAI_API_KEY` を環境変数に設定できること。
- `src/mastra/workflows/wikiWorkflow.ts` が存在し、要求分析→キーワード生成→Wiki 検索のステップを実行できること。
- `src/mastra/index.ts` にワークフローが登録され、`mastra dev` から呼び出せること。
- README にセットアップ方法とワークフロー実行例が追記されていること。
- ドキュメント (`docs/` 以下) が更新され、仕様・タスク・ワークフロー説明が参照できること。
