import sqlite3


try:
    conn = sqlite3.connect('assets/database/database.db')
    cursor = conn.cursor()

    cursor.executescript(
        """
            CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
            `id` integer PRIMARY KEY AUTOINCREMENT,
            `name` text NOT NULL
            );

            CREATE TABLE `users` (
            `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            `name` text NOT NULL
            );
        """
    )
    print("Conexão com o banco de dados estabelecida com sucesso!")
except sqlite3.Error as e:
    print(f"Erro ao conectar ao banco de dados: {e}")
finally:
    if conn:
        conn.close()
        print("Conexão fechada.")

