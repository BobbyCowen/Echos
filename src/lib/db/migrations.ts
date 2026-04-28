import { getDb } from './client';

export const runMigrations = async () => {
  const db = await getDb();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
};
