import sqlite3


try:
    conn = sqlite3.connect('assets/database/database.db')
    cursor = conn.cursor()

    cursor.executescript(
        """
            PRAGMA user_version = 001;

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
                record_date DATETIME,
                is_sync BOOLEAN DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
            );

            INSERT OR IGNORE INTO video (id, user_id, name, record_date) values 
                    (1, 1, 'video1', '2000-01-01'),
                    (2, 1, 'video2', '2000-01-01'),
                    (3, 1, 'video3', '2000-01-01'),
                    (4, 1, 'video4', '2000-01-01'),
                    (5, 1, 'video5', '2000-01-01');
        """
    )
    print('Conexão com o banco de dados estabelecida com sucesso!')
    conn.close()
except sqlite3.Error as e:
    print(f'Erro ao conectar ao banco de dados: {e}')
finally:
    if conn:
        conn.close()
        print('Conexão fechada.')

