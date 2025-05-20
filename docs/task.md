# タスク分解

`docs/spec.md` の内容を実現するための具体的なタスクを以下に示す。

1. `src/mastra/workflows/` ディレクトリを作成し `wikiWorkflow.ts` を追加する。
2. `wikiWorkflow.ts` では以下のステップを定義する。
   - OpenAI API を用いた要求分析タスク
   - OpenAI API を用いたキーワード生成タスク
   - Wikipedia API を用いた検索タスク
3. 新ワークフローを `src/mastra/index.ts` で登録し `mastra dev` から実行可能にする。
4. `OPENAI_API_KEY` を `.env` 等で設定できるよう README に追記する。
5. ワークフローの使い方や動作例を `docs/workflow.md` に記載する。
6. 変更後は `npx tsc --noEmit` を実行して型エラーがないか確認する。
