import Fastify from 'fastify';

import { registerHealthRoute } from '../routes/health.js';

export const createApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await registerHealthRoute(app);

  return app;
};
