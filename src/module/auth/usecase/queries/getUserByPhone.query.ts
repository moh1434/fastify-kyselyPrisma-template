import { User, type PrismaClient } from "@prisma/client";
import { APP_ERROR } from "../../../../utils/error/predefine-error.js";

export default class GetUserByPhone {
  constructor(private db: PrismaClient) {}
  async execute(phone: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { phone },
    });

    if (!user || !user.password) {
      throw APP_ERROR.NOT_FOUND({ resource: "user" });
    }

    return user;
  }
}
