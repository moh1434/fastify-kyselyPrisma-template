import { TokenPayload } from "../../dto/token.dto.js";
import { JwtWithRefresh } from "../../types.js";
import GetUserById from "../queries/getUserById.query.js";
import { GenerateTokensService } from "../../service/generateTokens.service.js";
import BlockTokenService from "../../service/blockToken.service.js";

export default class RefreshTokenCommand {
  constructor(
    private jwt: JwtWithRefresh,
    private getUserById: GetUserById,
    private generateTokensService: GenerateTokensService,
    private blockTokenService: BlockTokenService,
  ) {}

  async execute(refreshToken: string) {
    refreshToken = refreshToken.replace(/^Bearer\s+/, "");

    await this.blockTokenService.throwIfBlocked(refreshToken);

    const payload = this.jwt.refresh.verify<TokenPayload>(refreshToken);

    const user = await this.getUserById.execute(payload.id);

    await this.blockTokenService.makeBlock(refreshToken, payload.exp);

    return this.generateTokensService.execute(user);
  }
}
