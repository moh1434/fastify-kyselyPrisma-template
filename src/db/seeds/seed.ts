import type { Kysely } from "kysely";
import { DB } from "../../db/types.js";
import { usersSeed } from "./seedUser.js";

export async function seed(db: Kysely<DB>): Promise<void> {
  try {
    console.log("🌱 Seeding the database...");

    await db.deleteFrom("User").execute();
    await usersSeed(db);

    console.log("✅ Seeding completed.");
  } catch (e) {
    console.error(e);
  }
}
