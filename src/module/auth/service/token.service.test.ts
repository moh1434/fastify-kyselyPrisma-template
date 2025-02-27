//set custom .env.test values for this file
process.env.JWT_SECRET_KEY = "custom_access_secret_test";
process.env.JWT_EXPIRES = "5s";
process.env.JWT_REFRESH_SECRET_KEY = "custom_refresh_secret_test";
process.env.JWT_REFRESH_EXPIRES = "10s";

import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { fastify } from "../../../core/main.js";
import { TokenService } from "../service/token.service.js";
import { TokenCreatePayload } from "../dto/token.dto.js";
import { JwtWithRefresh } from "../types.js";
import { APP_ERROR } from "../../../utils/error/appErrors.js";
import { generateUser } from "../../../utils/test/generateUsers.js";

describe("TokenService", () => {
  let tokenService: TokenService;
  let jwt: JwtWithRefresh;
  let accessToken: string;
  let refreshToken: string;

  const userTokenPayload: Readonly<TokenCreatePayload> = {
    id: "1",
    phone: "123456789",
    verifiedPhone: true,
    role: "MEMBER",
  };

  beforeAll(async () => {
    if (!fastify) {
      throw new Error("Fastify is undefined");
    }
    await fastify.ready(); // Ensure Fastify is fully initialized

    console.log("token.service.test:", generateUser());
    tokenService = fastify.diContainer.cradle.tokenService;
    jwt = fastify.diContainer.cradle.jwt;
  });

  beforeEach(() => {
    const { token } = tokenService.generate(userTokenPayload);
    accessToken = token.accessToken;
    refreshToken = token.refreshToken;
  });

  it("should generate access and refresh tokens", () => {
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();

    const minTokenLength = 70;
    expect(accessToken.length).toBeGreaterThanOrEqual(minTokenLength);
    expect(refreshToken.length).toBeGreaterThanOrEqual(minTokenLength);
  });

  it("should decode a valid access token", async () => {
    const decoded = jwt.verify(accessToken);
    expect(decoded).toMatchObject(userTokenPayload);
  });

  it("should block a token and throw an error when used", async () => {
    await tokenService.makeBlock(
      accessToken,
      Math.floor(Date.now() / 1000) + 3600, // Expiration time 1 hour later
    );

    await expect(tokenService.throwIfBlocked(accessToken)).rejects.toThrow(
      (APP_ERROR as any).UNAUTHORIZED(),
    );
  });
});
