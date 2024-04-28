import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }),
  pfpPath: varchar("pdpPath", { length: 50 }),
});

export const pdfs = mysqlTable("pdfs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 40 }),
  author: varchar("author", { length: 80 }),
  path: varchar("path", { length: 20 }),
  pdfOwnerId: bigint("pdfOwnerId", { mode: "number" }).references(
    () => users.id
  ),
});

export const notes = mysqlTable("notes", {
  id: serial("id").primaryKey(),
  chapter: varchar("chapter", { length: 200 }),
  header: varchar("header", { length: 1000 }),
  question: varchar("question", { length: 5000 }),
  answer: varchar("answer", { length: 5000 }),
  pdfId: bigint("pdfId", { mode: "number" }).references(() => pdfs.id),
});

const poolConnection = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  database: "test",
  password: "password",
});

type User = typeof users.$inferSelect;
const db = drizzle(poolConnection);

export type { User };
export { db };
