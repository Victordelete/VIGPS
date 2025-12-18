import sqlite3

try:
    conn = sqlite3.connect('assets/database/database.db')
    cursor = conn.cursor()

    with open('src/database/migrations/0000_initial.sql', 'r+') as file:
        query = file.read()
        
    cursor.executescript(query)
    print('Conexão com o banco de dados estabelecida com sucesso!')
    conn.close()
except sqlite3.Error as e:
    print(f'Erro ao conectar ao banco de dados: {e}')
finally:
    if conn:
        conn.close()
        print('Conexão fechada.')

