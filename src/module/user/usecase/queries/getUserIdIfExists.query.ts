import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class GetUserIdIfExistsQuery {
  constructor(private db: KyselyDB) {}
  async execute(phone: string) {
    const user = await this.db
      .selectFrom("User")
      .where("User.phone", "=", phone)
      .select("User.id")
      .executeTakeFirst();

    return user;
  }
}
