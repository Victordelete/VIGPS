import { exists } from 'drizzle-orm';
import { File, Directory, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import migration_0000 from './migrations/migration_0000.js'

// Caminhos
const DB_NAME = '../../assets/database/database.db';
const DB_NAME_REQUIRE = require('../../assets/database/database.db');

export async function ensureDatabaseExists() {
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const db_version = await db.getAllAsync("PRAGMA user_version");

    if (db_version[0].user_version == 0) {
      await db.execAsync(migration_0000);
    }

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
    return new_video.lastInsertRowId;
  } catch (err) {
    db.closeAsync();
    console.log("Erro", err);
  }
};

export async function savePositions(video_id, positions) { 
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    let query = `INSERT INTO position (video_id, altitude, latitude, longitude, timestamp) values `;
    for (const position of positions){
      query = query + `(${video_id}, ${position.altitude}, ${position.latitude}, ${position.longitude}, ${position.timestamp}), `
    }
    const query_up = query.slice(0, -2) + ';';
    const new_positions = await db.runAsync(query_up);
    db.closeAsync();
    return new_positions;
  } catch (err) {
    db.closeAsync();
    console.log("Erro", err);
  }
};

export async function getPositionByVideo(video_id) { 
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const positions = await db.getAllAsync( `SELECT * FROM position WHERE video_id = ${video_id};`);
    db.closeAsync();
    return positions;
  } catch (err) {
    console.log("Erro", err);
  }
};

export async function deleteVideoById(video_id) {
  try {
    const db = SQLite.openDatabaseSync(DB_NAME);
    const result = await db.runAsync(
      `DELETE FROM video WHERE id = ?`,
      [video_id]
    );
    return result;
  } catch (err) {
    console.log("Erro ao deletar:", err);
  }
}