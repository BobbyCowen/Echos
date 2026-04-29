import { runMigrations } from '@/src/lib/db/migrations';

let initialized = false;

export const initializeEntriesDb = async () => {
  if (initialized) {
    return;
  }

  await runMigrations();
  initialized = true;
};
