import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class GetUserById {
  constructor(private db: KyselyDB) {}
  async execute(userId: string) {
    const user = await this.db
      .selectFrom("User")
      .where("User.id", "=", userId)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      throw APP_ERROR.NOT_FOUND({ resource: "user" });
    }

    return user;
  }
}
