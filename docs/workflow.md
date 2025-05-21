# ワークフロー説明

本リポジトリでは Mastra を用いて Wiki 検索ワークフローを実装する。

## フロー概要
1. **要求分析** – ユーザーの問い合わせから目的を抽出する。
2. **キーワード生成** – 抽出した目的から検索キーワードを作成する。
3. **Wiki 検索** – キーワードで Wikipedia API を検索し結果を返す。

## 実行方法
1. `OPENAI_API_KEY` を環境変数または `.env` に設定する。
2. `npm install` で依存を導入する。
3. `npm run dev` を実行し、`wikiWorkflow` を選択して利用する。

## 例
```
ユーザー: 富士山の高さが知りたい
→ 要求分析
→ キーワード生成
→ Wiki 検索
```

上記のように、入力文に対して段階的に処理が行われ Wikipedia の検索結果が得られる。

## ワークフロー構成

`src/workflows/` には以下のサブディレクトリを用意している。

- `analysis_and_requirements/` – 要求分析や要件整理のツールを配置
- `design_assistant/` – 設計支援に関するワークフローを配置
- `ui_generation/` – UI 生成に関するワークフローを配置
- `documentation_and_formatting/` – ドキュメント化や整形処理用
- `utilities_and_poc/` – 便利ツールや試作的なワークフローを管理

それぞれのディレクトリ内には今後追加予定のツールを記載した `README.md` を置いてある。
