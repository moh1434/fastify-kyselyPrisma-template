//this file used by kysely-ctl for seeds only
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
import { defineConfig, Seeder } from "kysely-ctl";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "../src/db/types"; // this is the Database interface we defined earlier
import pg from "pg";
import { dialectPoolConfig } from "../src/core/plugin/kysely.plugin";
const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool(dialectPoolConfig),
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
