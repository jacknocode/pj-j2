# 仕様書

Mastra を用いた新規ワークフロー **Wiki 検索ワークフロー** を実装する。

## 機能概要
1. **要求分析**: ユーザーからの入力を解析し目的や意図を抽出する。
2. **キーワード生成**: 要求分析の結果から関連キーワードを生成する。
3. **Wiki 検索**: 生成したキーワードを用いて Wikipedia API を検索し結果を返す。

OpenAI API を利用するため `OPENAI_API_KEY` 環境変数を使用する。
ワークフローの実装は `src/mastra/workflows/wikiWorkflow.ts` とし、`mastra dev` から実行できるよう `src/mastra/index.ts` に登録する。
