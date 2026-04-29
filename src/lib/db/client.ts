import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'echos.db';

let database: SQLite.SQLiteDatabase | null = null;
let pendingDatabasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export const getDb = async () => {
  if (database) {
    return database;
  }

  if (pendingDatabasePromise) {
    return await pendingDatabasePromise;
  }

  console.log('[db] opening database', DATABASE_NAME);

  pendingDatabasePromise = SQLite.openDatabaseAsync(DATABASE_NAME)
    .then((db) => {
      console.log('[db] database opened successfully');
      database = db;
      return db;
    })
    .finally(() => {
      pendingDatabasePromise = null;
    });

  return await pendingDatabasePromise;
};

export const closeDb = async () => {
  if (!database) {
    return;
  }

  await database.closeAsync();
  database = null;
};
