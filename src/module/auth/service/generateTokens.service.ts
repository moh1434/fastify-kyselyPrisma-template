import { TokenCreatePayload } from "../dto/token.dto.js";
import { JwtWithRefresh } from "../types.js";
import { configSchema } from "../../../core/plugin/env.plugin.js";

export class GenerateTokensService {
  constructor(
    private jwt: JwtWithRefresh,
    private config: configSchema,
  ) {}

  execute(user: TokenCreatePayload) {
    const payload: TokenCreatePayload = {
      id: user.id,
      phone: user.phone,
      verifiedPhone: user.verifiedPhone,
      role: user.role,
    };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.config.JWT_EXPIRES,
    });
    const refreshToken = this.jwt.refresh.sign(payload, {
      expiresIn: this.config.JWT_REFRESH_EXPIRES,
    });

    return {
      token: {
        accessToken,
        refreshToken,
      },
    };
  }
}
