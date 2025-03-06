import type { Kysely } from "kysely";
import { DB } from "../types.js";
import { usersForSeed } from "../data/usersSeedPayload.js";

export async function usersSeed(db: Kysely<DB>) {
  try {
    await db.insertInto("User").values(usersForSeed.member.normal).execute();
    await db.insertInto("User").values(usersForSeed.member.deleted).execute();
    await db
      .insertInto("User")
      .values(usersForSeed.member.unVerified)
      .execute();

    await db.insertInto("User").values(usersForSeed.admin.normal).execute();
    await db.insertInto("User").values(usersForSeed.admin.deleted).execute();
    await db.insertInto("User").values(usersForSeed.admin.unVerified).execute();

    return usersForSeed;
  } catch (e) {
    console.error(e);
  }
}
