import * as SQLite from 'expo-sqlite';

const database_path = require('../../assets/database/database.db')
const db = SQLite.openDatabase(database_path);

export function execute(query) {
    db.transaction(tx => {
    tx.executeSql(
        query
    );
    });
}

export function execute_teste() {
    db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);'
    );
    });
}