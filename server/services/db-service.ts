import Database from 'better-sqlite3';

const DB_PATH = './database.db';

class DBService {
  private db: Database.Database;

  constructor() {
    this.db = new Database(DB_PATH);
    this.setupSchema();
  }

  private setupSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);
  }

  getUsers() {
    return this.db.prepare('SELECT * FROM users').all();
  }

  createUser(user: { name: string; email: string }) {
    this.db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(user.name, user.email);
  }
}

export const dbService = new DBService();
