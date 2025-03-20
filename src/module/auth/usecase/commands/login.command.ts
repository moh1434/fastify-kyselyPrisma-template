import { LoginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import GetUserByPhoneQuery from "../queries/getUserByPhone.query.js";
import { TokenService } from "../../service/token.service.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class LoginCommand {
  constructor(
    private db: KyselyDB,
    private config: configSchema,
    private passwordService: PasswordService,
    private getUserByPhoneQuery: GetUserByPhoneQuery,
    private tokenService: TokenService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.getUserByPhoneQuery.execute(dto.phone);

    const isMatch = await this.passwordService.verify(
      dto.password,
      user.password,
    );

    if (!isMatch) {
      throw APP_ERROR.WRONG_PASSWORD({ resource: "password" });
    }
    return this.tokenService.generate(user);
  }
}
