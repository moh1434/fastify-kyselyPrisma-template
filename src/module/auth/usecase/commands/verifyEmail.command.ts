import { LoginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import { JwtWithRefresh } from "../../types.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class VerifyEmailCommand {
  constructor(
    private db: KyselyDB,
    private jwt: JwtWithRefresh,
    private passwordService: PasswordService,
    private config: configSchema,
  ) {}

  async execute(dto: LoginDto) {}
}
