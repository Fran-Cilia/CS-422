import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import Database from "better-sqlite3";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  pfpPath: text("pdpPath"),
});

export const pdfs = sqliteTable("pdfs", {
  id: integer("id").primaryKey(),
  name: text("name"),
  author: text("author"),
  path: text("path"),
  pdfOwnerId: integer("pdfOwnerId").references(() => users.id),
});

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey(),
  chapter: text("chapter"),
  header: text("header"),
  question: text("question"),
  answer: text("answer"),
  pdfId: integer("pdfId").references(() => pdfs.id),
});

const sqlite = new Database("sqlite.db");
const db: BetterSQLite3Database = drizzle(sqlite);

export { db };
