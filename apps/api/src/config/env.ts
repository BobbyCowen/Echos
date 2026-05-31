export const env = {
  port: Number(process.env.PORT ?? 3001),
  host: process.env.HOST ?? '0.0.0.0',
  databaseUrl: process.env.DATABASE_URL ?? '',
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:8081')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
