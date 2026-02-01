# Mastra Workflow (Archived)

Mastra を利用したワークフロー開発コード。現在は使用していません。

## 含まれるもの

- `src/mastra/` - Mastra エージェント・ツール・ワークフロー
  - Weather Agent (OpenAI GPT-4o)
  - Weather Tool (Open-Meteo API)
  - Wiki Search Workflow (Wikipedia API)
- `docs/` - 当時の仕様書・タスク定義

## 復元する場合

```bash
cd _archived/mastra
npm install
npm run dev
```

`OPENAI_API_KEY` の設定が必要です。
