import { TokenPayload } from "../../dto/token.dto.js";
import { JwtWithRefresh } from "../../types.js";
import GetUserByIdQuery from "../../../user/usecase/queries/getUserById.query.js";
import { TokenService } from "../../service/token.service.js";

export default class RefreshTokenCommand {
  constructor(
    private jwt: JwtWithRefresh,
    private getUserByIdQuery: GetUserByIdQuery,
    private tokenService: TokenService,
  ) {}

  async execute(refreshToken: string) {
    refreshToken = refreshToken.replace(/^Bearer\s+/, "");

    await this.tokenService.throwIfBlocked(refreshToken);

    const payload = this.jwt.refresh.verify<TokenPayload>(refreshToken);

    const user = await this.getUserByIdQuery.execute(payload.id);

    await this.tokenService.makeBlock(refreshToken, payload.exp);

    return this.tokenService.generate(user);
  }
}
