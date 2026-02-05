
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { weatherAgent, lpGeneratorAgent } from './agents';
import { wikiWorkflow } from './workflows/wikiWorkflow';

export const mastra = new Mastra({
  agents: { weatherAgent, lpGeneratorAgent },
  workflows: { wikiWorkflow },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
