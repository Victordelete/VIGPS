import { exists } from 'drizzle-orm';
import { File, Directory, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

// Caminhos
const DB_NAME = '../../assets/database/database.db';
const DB_NAME_REQUIRE = require('../../assets/database/database.db');

export async function ensureDatabaseExists() {
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const db_version = await db.runAsync("PRAGMA user_version");

    await db.execAsync(`PRAGMA user_version = 001;

                DROP TABLE IF EXISTS user;
                DROP TABLE IF EXISTS video;

                CREATE TABLE user (
                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                    name text NOT NULL,
                    email text NOT NULL,
                    access INTEGER NOT NULL
                );

                INSERT OR IGNORE INTO user (id, name, email, access) values 
                        (1, 'admin', 'admin@vigps.com', 1),
                        (2, 'support', 'support@vigps.com', 2),
                        (3, 'user', 'user@vigps.com', 3);

                CREATE TABLE video (
                    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                    user_id INTEGER NOT NULL,
                    name text NOT NULL,
                    path text NOT NULL,
                    record_date DATETIME NOT NULL,
                    is_sync BOOLEAN DEFAULT 0,
                    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
                );

                INSERT OR IGNORE INTO video (id, user_id, name, path, record_date) values 
                        (1, 1, 'video1', 'video1_path', '2000-01-01'),
                        (2, 1, 'video2', 'video2_path', '2000-01-01'),
                        (3, 1, 'video3', 'video3_path', '2000-01-01'),
                        (4, 1, 'video4', 'video4_path', '2000-01-01'),
                        (5, 1, 'video5', 'video5_path', '2000-01-01');`);
    db.closeAsync();
  } catch (error) {
    db.closeAsync();
    console.error(error);
  }
}

export async function getVideos() { 
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const videos = await db.getAllAsync('SELECT * FROM video;');
    db.closeAsync();
    return videos;
  } catch (err) {
    console.log("Erro", err);
  }
};

export async function saveVideo(video) { 
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const query = `INSERT INTO video (user_id, name, path, record_date) values 
                                      (${video.user_id}, '${video.name}', '${video.path}', '${video.record_date}');`
    const new_video = await db.runAsync(query);
    db.closeAsync();
    return new_video;
  } catch (err) {
    db.closeAsync();
    console.log("Erro", err);
  }
};