import { openai } from '@ai-sdk/openai';

/**
 * Wiki 検索ワークフロー
 * - 要求分析
 * - キーワード生成
 * - Wikipedia 検索
 */
export async function wikiWorkflow(query: string): Promise<string> {
  // 1. 要求分析
  const analysis = await openai('gpt-4o').complete({
    messages: [{ role: 'user', content: `要求を分析してください: ${query}` }],
  });

  // 2. キーワード生成
  const keywords = await openai('gpt-4o').complete({
    messages: [
      { role: 'system', content: 'キーワードを生成してください' },
      { role: 'user', content: analysis.text },
    ],
  });

  // 3. Wikipedia 検索
  const url =
    'https://ja.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=' +
    encodeURIComponent(keywords.text);
  const response = await fetch(url);
  const data = await response.json();
  return JSON.stringify(data);
}
