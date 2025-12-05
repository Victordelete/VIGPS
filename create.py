import sqlite3


try:
    conn = sqlite3.connect('assets/database/database.db')
    cursor = conn.cursor()

    cursor.executescript(
        """
            PRAGMA user_version = 001;

            CREATE TABLE `users` (
            `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            `name` text NOT NULL
            );

            INSERT OR IGNORE INTO users (id, name) values 
            (1, 'admin'), (2, 'support'), (3, 'test');
        """
    )
    print("Conexão com o banco de dados estabelecida com sucesso!")
except sqlite3.Error as e:
    print(f"Erro ao conectar ao banco de dados: {e}")
finally:
    if conn:
        conn.close()
        print("Conexão fechada.")

