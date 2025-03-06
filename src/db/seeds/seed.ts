import type { Kysely } from "kysely";
import { DB } from "../../db/types.js";
import { seedUsers } from "../data/usersSeedPayload.js";

export async function seed(db: Kysely<DB>): Promise<void> {
  try {
    console.log("🌱 Seeding the database...");

    await db.deleteFrom("User").execute();

    await db.insertInto("User").values(seedUsers.member.normal).execute();
    await db.insertInto("User").values(seedUsers.member.deleted).execute();
    await db.insertInto("User").values(seedUsers.member.unVerified).execute();

    await db.insertInto("User").values(seedUsers.admin.normal).execute();
    await db.insertInto("User").values(seedUsers.admin.deleted).execute();
    await db.insertInto("User").values(seedUsers.admin.unVerified).execute();

    console.log("✅ Seeding completed.");
  } catch (e) {
    console.error(e);
  }
}
