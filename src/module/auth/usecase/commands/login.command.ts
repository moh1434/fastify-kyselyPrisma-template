import { loginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/predefine-error.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import GetUserByPhone from "../queries/getUserByPhone.query.js";
import { GenerateTokensService } from "../../service/generateTokens.service.js";

export default class LoginCommand {
  constructor(
    // private db: PrismaClient,
    private config: configSchema,
    private passwordService: PasswordService,
    private getUserByPhone: GetUserByPhone,
    private generateTokensService: GenerateTokensService,
  ) {}

  async execute(dto: loginDto) {
    const user = await this.getUserByPhone.execute(dto.phone);

    const isMatch = await this.passwordService.verify(
      dto.password,
      user.password,
    );

    if (!isMatch) {
      throw APP_ERROR.WRONG_PASSWORD({ resource: "password" });
    }
    return this.generateTokensService.execute(user);
  }
}
