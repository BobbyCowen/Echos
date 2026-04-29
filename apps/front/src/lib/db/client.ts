import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'echos.db';

let database: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(DATABASE_NAME);
  return database;
};

export const closeDb = async () => {
  if (!database) {
    return;
  }

  await database.closeAsync();
  database = null;
};
