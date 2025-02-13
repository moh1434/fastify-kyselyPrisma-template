import { User } from "../../../../db/types.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";
import { TokenPayload } from "../../../auth/dto/token.dto.js";
import { exampleDto } from "../../dto/example.dto.js";

export default class getByIdExampleQuery {
  constructor(
    private db: KyselyDB,
    private tokenPayload: TokenPayload,
  ) {}
  async execute(dto: exampleDto): Promise<DbType<User> | undefined> {
    const user = await this.db
      .selectFrom("User")
      .where("User.email", "=", dto.email)
      .selectAll()
      .executeTakeFirst();
    return user;
  }
}
