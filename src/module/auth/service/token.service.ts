import { TokenCreatePayload } from "../dto/token.dto.js";
import { JwtWithRefresh } from "../types.js";
import { configSchema } from "../../../core/plugin/env.plugin.js";
import { CacheType } from "../../../core/plugin/di.plugin.js";
import { APP_ERROR } from "../../../utils/error/appErrors.js";

export class TokenService {
  constructor(
    private jwt: JwtWithRefresh,
    private config: configSchema,
    private cache: CacheType,
  ) {}
  getTokenPayload(user: any): TokenCreatePayload {
    return {
      id: user.id,
      phone: user.phone,
      verifiedPhone: user.verifiedPhone,
      role: user.role,
    };
  }
  generate(user: TokenCreatePayload) {
    const payload: TokenCreatePayload = this.getTokenPayload(user);

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
  async throwIfBlocked(token: string) {
    const isBlocked = await this.cache.get<boolean>(`block:${token}`);

    if (isBlocked) {
      throw APP_ERROR.UNAUTHORIZED();
    }
  }
  async makeBlock(token: string, exp: number) {
    const expiresIn = exp * 1000 - Date.now();

    await this.cache.set<boolean>(`block:${token}`, true, expiresIn);
  }
}
