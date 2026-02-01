
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { weatherAgent } from './agents';
import { wikiWorkflow } from './workflows/wikiWorkflow';

export const mastra = new Mastra({
  agents: { weatherAgent },
  workflows: { wikiWorkflow },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
