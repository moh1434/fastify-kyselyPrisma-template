//set custom .env.test values for this file
process.env.JWT_SECRET_KEY = "custom_access_secret_test";
process.env.JWT_EXPIRES = "5s";
process.env.JWT_REFRESH_SECRET_KEY = "custom_refresh_secret_test";
process.env.JWT_REFRESH_EXPIRES = "10s";

import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { fastify } from "../../core/main.js";
import { seedUsers } from "../../db/data/usersSeedPayload.js";
import { KyselyDB } from "../type/kysely.js";

describe("Seed Seed Seed.test.ts", () => {
  let db: KyselyDB;

  beforeEach(() => {
    db = fastify!.diContainer.cradle.db;
  });

  it("should get the same seed user from the DB", async () => {
    const seededUser = await db
      .selectFrom("User")
      .where("User.phone", "=", seedUsers.member.normal[0].phone)
      .selectAll()
      .executeTakeFirst();

    expect(seededUser).toEqual(seedUsers.member.normal[0]);
  });
});
