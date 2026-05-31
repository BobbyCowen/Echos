import cors from '@fastify/cors';
import Fastify from 'fastify';

import { env } from '../config/env.js';
import { registerEntriesRoutes } from '../features/entries/entries.route.js';
import { registerHealthRoute } from '../routes/health.js';

export const createApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: env.corsOrigins,
  });

  await registerHealthRoute(app);
  await registerEntriesRoutes(app);

  return app;
};
