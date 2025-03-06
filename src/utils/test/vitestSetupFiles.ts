import { beforeAll } from "vitest";
import { execSync } from "child_process";
import { fastify } from "../../core/main.js";

beforeAll(async () => {
  execSync("dotenv -e .env.test pnpm run seed", { stdio: "inherit" }); // Runs your seed script

  if (!fastify) {
    throw new Error("Fastify is undefined");
  }
  await fastify.ready(); // Ensure Fastify is fully initialized
});
