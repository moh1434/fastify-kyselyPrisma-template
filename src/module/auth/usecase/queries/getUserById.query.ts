import { type PrismaClient } from "@prisma/client";
import { APP_ERROR } from "../../../../utils/error/predefine-error.js";

export default class GetUserById {
  constructor(private db: PrismaClient) {}
  async execute(userId: string) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw APP_ERROR.NOT_FOUND({ resource: "user" });
    }

    return user;
  }
}
