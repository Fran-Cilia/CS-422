import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import {
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id"),
  name: varchar("name", { length: 30 }),
  test: int("test"),
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
