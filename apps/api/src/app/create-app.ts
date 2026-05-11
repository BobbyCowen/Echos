import Fastify from 'fastify';

import { registerEntriesRoutes } from '../features/entries/entries.route.js';
import { registerHealthRoute } from '../routes/health.js';

export const createApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await registerHealthRoute(app);
  await registerEntriesRoutes(app);

  return app;
};
