import 'dotenv/config';

import { createApp } from './app/create-app.js';
import { env } from './config/env.js';

const bootstrap = async () => {
  const app = await createApp();

  try {
    await app.listen({
      host: env.host,
      port: env.port,
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void bootstrap();
