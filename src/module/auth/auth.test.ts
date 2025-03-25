import { describe, it, expect, beforeAll, vi, beforeEach } from "vitest";
import { fastify } from "../../core/main.js";
import { type RegisterDto } from "./dto/register.dto.js";
import { type LoginDto } from "./dto/login.dto.js";
import { TEST_HASHED_PASSWORD } from "../../utils/test/generateUsers.js";
import GetUserByIdQuery from "../user/usecase/queries/getUserById.query.js";
import { testUsers } from "../../db/data/usersSeedPayload.js";

describe("Auth Controller", () => {
  let getUserByIdQuery: GetUserByIdQuery;

  //available after register test
  let registeredUserId: string;

  //available after login test
  let loginInTokens: {
    accessToken: string;
    refreshToken: string;
  };

  const registerDto: RegisterDto = {
    phone: testUsers.member.normal[0].phone,
    password: TEST_HASHED_PASSWORD,
    confirmPassword: TEST_HASHED_PASSWORD,
    email: testUsers.member.normal[0].email,
    firstName: testUsers.member.normal[0].firstName,
    secondName: testUsers.member.normal[0].secondName,
    thirdName: testUsers.member.normal[0].thirdName,
  };
  const loginDto: LoginDto = {
    phone: registerDto.phone,
    password: registerDto.password,
  };

  beforeAll(async () => {
    getUserByIdQuery = fastify!.diContainer.cradle.getUserByIdQuery;
    await fastify?.ready();

    vi.spyOn(fastify!.diContainer.cradle.refreshTokenCommand, "execute");
    vi.spyOn(fastify!.diContainer.cradle.tokenService, "generate");
  });
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it.sequential("should register a new user", async () => {
    const response = await fastify!.inject({
      url: "/auth/register",
      method: "POST",
      body: registerDto,
    });
    const responseBody = JSON.parse(response.body);

    expect(response?.statusCode).toBe(200);
    expect(responseBody).toHaveProperty("id");

    registeredUserId = responseBody.id;
    const registeredUser = await getUserByIdQuery.execute(registeredUserId);

    expect(registeredUser).toBeDefined();
    expect(registeredUser.phone).toBe(registerDto.phone);
  });

  it.sequential("should return a token after login", async () => {
    const response = await fastify!.inject({
      method: "POST",
      url: "/auth/login",
      payload: loginDto,
    });
    const responseBody = JSON.parse(response.body) as {
      token: {
        accessToken: string;
        refreshToken: string;
      };
    };
    loginInTokens = responseBody.token;
    expect(response.statusCode).toBe(200);
    expect(typeof responseBody.token.accessToken).toBe("string");
    expect(typeof responseBody.token.refreshToken).toBe("string");
  });

  it.sequential("should generate a new token using refresh token", async () => {
    const response = await fastify!.inject({
      method: "POST",
      url: "/auth/use-refresh-token",
      headers: { authorization: `Bearer ${loginInTokens.refreshToken}` },
    });
    const responseBody = JSON.parse(response.body) as {
      token: {
        accessToken: string;
        refreshToken: string;
      };
    };
    expect(response.statusCode).toBe(200);
    expect(
      fastify!.diContainer.cradle.refreshTokenCommand.execute,
    ).toHaveBeenCalled();
    expect(
      fastify!.diContainer.cradle.tokenService.generate,
    ).toHaveBeenCalled();

    expect(typeof responseBody.token.accessToken).toBe("string");
    expect(typeof responseBody.token.refreshToken).toBe("string");
  });
});
