import { fullNameFrom } from "../../../../utils/helpers/fullName.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";
import { profileUpdateDto } from "../../dto/profileUpdate.dto.js";

export default class UpdateProfileCommand {
  constructor(private db: KyselyDB) {}
  async execute(userId: string, payload: profileUpdateDto) {
    return await this.db
      .updateTable("User")
      .set({
        fullName: fullNameFrom(payload),
      })
      .where("User.id", "=", userId)
      .execute();
  }
}
