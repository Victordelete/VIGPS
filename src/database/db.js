import { File, Directory, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

// Caminhos
const DB_NAME = '../../assets/database/database.db';
const DB_NAME_REQUIRE = require('../../assets/database/database.db');

async function ensureDatabaseExists() {

  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const db_version = await db.runAsync("PRAGMA user_version");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchItems() { 
  await ensureDatabaseExists(); // garante que o banco está OK
  const db = SQLite.openDatabaseSync(DB_NAME);
  const result = await db.getAllAsync('SELECT * FROM users;');
  return result
};