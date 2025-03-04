import fastifyPlugin from "fastify-plugin";
import { DB } from "../../db/types.js"; // this is the Database interface we defined earlier
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
export const dialectPoolConfig = {
  database: process.env.KYSELY_DATABASE,
  host: process.env.KYSELY_HOST,
  password: process.env.KYSELY_PASSWORD,
  user: process.env.KYSELY_USER,
  port: Number(process.env.KYSELY_PORT),
  max: Number(process.env.KYSELY_MAX_CONNECTIONS_PER_CLUSTER),
};

const { Pool } = pg;
export const kyselyLoadPlugin = fastifyPlugin(async (fastify, opts) => {
  const dialect = new PostgresDialect({
    pool: new Pool(dialectPoolConfig),
  });

  const kysely = new Kysely<DB>({
    dialect,
  });

  fastify.decorate("db", kysely);

  fastify.addHook("onClose", async (server) => {
    await kysely.destroy();
  });
});
