import { runMigrations } from '@/src/lib/db/migrations';

export const initializeEntriesDb = async () => {
  await runMigrations();
};
