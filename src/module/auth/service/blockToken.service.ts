import { CacheType } from "../../../core/plugin/di.plugin.js";
import { APP_ERROR } from "../../../utils/error/predefine-error.js";
import { TokenPayload } from "../dto/token.dto.js";
import { JwtWithRefresh } from "../types.js";

export default class BlockTokenService {
  constructor(
    private jwt: JwtWithRefresh,
    private cache: CacheType,
  ) {}

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
