import { Platform } from "react-native";
import { drizzle } from "drizzle-orm";
import * as SQLite from "expo-sqlite";
import initSqlJs from "sql.js";

let db;

export async function getDb() {
  console.log('teste');
  // if (db) return db

  // if (Platform.OS === "web") {
    
  //   const SQL = await initSqlJs({
  //     locateFile: (file) => `https://sql.js.org/dist/${file}`
  //   });
    
  //   const webDb = new SQL.Database();
  //   db = drizzle(webDb);
  // } else {
  //   const sqlite = SQLite.openDatabase("app.db");
  //   db = drizzle(sqlite); 
  // }
  
  db = await  SQLite.openDatabaseAsync('../../assets/database/database.db');
  console.log(db);
  // const sqlite = SQLite.openDatabase("../../assets/database/database.db");
  // db = drizzle(sqlite); 

  console.log(db);
  return db;
}
