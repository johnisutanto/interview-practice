import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type Item = {
  id: number;
  title: string;
  details: string;
  createdAt: string;
};

type ItemRow = {
  id: number;
  title: string;
  details: string;
  created_at: string;
};

export function openDatabase(filename: string): DatabaseSync {
  const db = new DatabaseSync(filename);
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL CHECK (length(title) > 0),
      details TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}

function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    title: row.title,
    details: row.details,
    createdAt: row.created_at,
  };
}

export function listItems(db: DatabaseSync): Item[] {
  const rows = db
    .prepare("SELECT id, title, details, created_at FROM items ORDER BY id DESC")
    .all() as ItemRow[];
  return rows.map(toItem);
}

export function createItem(db: DatabaseSync, title: string, details: string): Item {
  const result = db.prepare("INSERT INTO items (title, details) VALUES (?, ?)").run(title, details);
  const row = db
    .prepare("SELECT id, title, details, created_at FROM items WHERE id = ?")
    .get(Number(result.lastInsertRowid)) as ItemRow;
  return toItem(row);
}

const dataDir = path.join(import.meta.dirname, "data");
mkdirSync(dataDir, { recursive: true });

export const db = openDatabase(path.join(dataDir, "app.sqlite"));
