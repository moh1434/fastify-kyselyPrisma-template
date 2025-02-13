import { User } from "../../../../db/types.js";
import { APP_ERROR } from "../../../../utils/error/predefine-error.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";

export default class GetUserByPhone {
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
