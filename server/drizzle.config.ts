/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: drizzle.config.ts: Links all of the files used in the server together. Essentially, describes where to find and place all server-related folders.
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
