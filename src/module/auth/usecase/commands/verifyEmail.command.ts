import { loginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import { type User, type PrismaClient } from "@prisma/client";
import { JwtWithRefresh } from "../../types.js";

export default class VerifyEmailCommand {
  constructor(
    private db: PrismaClient,
    private jwt: JwtWithRefresh,
    private passwordService: PasswordService,
    private config: configSchema,
  ) {}

  async execute(dto: loginDto) {}
}
