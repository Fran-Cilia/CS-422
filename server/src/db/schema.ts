/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: Describes the database schemas (datastructures) used for storing different data.
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import Database from "better-sqlite3";

//describes users database table, where each user contains:
// - user ID
// - user name
// - profile picture path
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  pfpPath: text("pdpPath"),
});

//describes pdfs database table, which contains all of the PDF specific data. Each PDF contains:
// - PDF ID
// - PDF Name
// - PDF Author
// - PDF file path
// - PDF Owner (which user has access)
export const pdfs = sqliteTable("pdfs", {
  id: integer("id").primaryKey(),
  name: text("name"),
  author: text("author"),
  path: text("path"),
  pdfOwnerId: integer("pdfOwnerId").references(() => users.id),
});

//describes the notes database table, which contains each question/answer combo associated with PDFS.
//Each note contains:
// - Note ID
// - Chapter (text field)
// - Header (text field)
// - Answer (text field)
// - PDF ID of the PDF this note is associated with
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

//allows the database to be accessible to other files.
export { db };
