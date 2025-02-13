import { PrismaClient } from "@prisma/client";
import { TokenPayload } from "../../../auth/dto/token.dto.js";
import { exampleDto } from "../../dto/example.dto.js";

export default class getAllExampleQuery {
  constructor(
    private db: PrismaClient,
    private tokenPayload: TokenPayload,
  ) {}
  execute(dto: exampleDto) {
    return this.db.user.findUnique({
      where: {
        phone: "",
      },
    });
  }
}
