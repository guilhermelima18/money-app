import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabse(database: SQLiteDatabase) {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS categorias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )
    `);

  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS transacoes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            tipo TEXT NOT NULL,
            valor REAL NOT NULL,
            data_criacao TEXT NOT NULL,
            id_categoria INTEGER NOT NULL,
            FOREIGN KEY (id_categoria) REFERENCES categorias(id)
        )    
    `);
}
