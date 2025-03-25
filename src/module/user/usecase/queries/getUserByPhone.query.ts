import { User } from "../../../../db/types.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";

export default class GetUserByPhoneQuery {
  constructor(private db: KyselyDB) {}

  async execute(phone: string): Promise<DbType<User>> {
    const user = await this.db
      .selectFrom("User")
      .where("User.phone", "=", phone)
      .selectAll()
      .executeTakeFirst();

    if (!user || !user.password) {
      throw APP_ERROR.NOT_FOUND({ resource: "user" });
    }
    return user;
  }
}
