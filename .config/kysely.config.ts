//this file used by kysely-ctl for seeds only, pnpm seed
//this file used by kysely-ctl for seeds only
//this file used by kysely-ctl for seeds only, pnpm seed
//this file used by kysely-ctl for seeds only
//this file used by kysely-ctl for seeds only, pnpm seed

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
import { defineConfig } from "kysely-ctl";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "../src/db/types";
import pg from "pg";
import { dialectPoolConfig } from "../src/core/plugin/kysely.plugin";
const { Pool } = pg;

//prevent seeding the production database by accident
if (!process.env.KYSELY_DATABASE) {
  throw new Error("process.env has not been loaded yet.");
}
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development") {
  throw new Error(`can't seed when NODE_ENV=${process.env.NODE_ENV}`);
}
//

const dialect = new PostgresDialect({
  pool: new Pool(dialectPoolConfig()),
});
const kysely = new Kysely<DB>({
  dialect,
});

export default defineConfig({
  kysely,
  seeds: {
    seedFolder: "./src/db/seeds",
  },
});
