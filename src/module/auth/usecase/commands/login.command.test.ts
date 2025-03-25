import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import GetUserByPhoneQuery from "../../../user/usecase/queries/getUserByPhone.query.js";
import { TokenService } from "../../service/token.service.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";
import LoginCommand from "./login.command.js";
import { fastify } from "../../../../core/main.js";
import { usersForSeed } from "../../../../db/data/usersSeedPayload.js";
import { spyAllMethods } from "../../../../utils/test/spyAllMethods.js";
import { TEST_PASSWORD } from "../../../../utils/test/generateUsers.js";

describe("LoginCommand", () => {
  let loginCommand: LoginCommand;
  let passwordService: PasswordService;
  let getUserByPhoneQuery: GetUserByPhoneQuery;
  let tokenService: TokenService;
  let config: configSchema;
  let db: KyselyDB;

  beforeAll(async () => {
    loginCommand = fastify!.diContainer.cradle.loginCommand;
    passwordService = fastify!.diContainer.cradle.passwordService;
    getUserByPhoneQuery = fastify!.diContainer.cradle.getUserByPhoneQuery;
    tokenService = fastify!.diContainer.cradle.tokenService;
    config = fastify!.diContainer.cradle.config;
    db = fastify!.diContainer.cradle.db;

    // Setup spies before all tests
    spyAllMethods(loginCommand);
    spyAllMethods(passwordService);
    spyAllMethods(getUserByPhoneQuery);
    spyAllMethods(tokenService);
  });
  beforeEach(async () => {
    vi.clearAllMocks();
  });
  //i want to only test the
  it("should return a token when login is successful", async () => {
    const dto = {
      phone: usersForSeed.member.normal[0].phone,
      password: TEST_PASSWORD,
    };

    const { token } = await loginCommand.execute(dto);

    expect(getUserByPhoneQuery.execute).toHaveBeenCalledWith(dto.phone);
    expect(passwordService.verify).toHaveBeenCalledWith(
      dto.password,
      usersForSeed.member.normal[0].password,
    );
    expect(tokenService.generate).toHaveBeenCalledWith(
      usersForSeed.member.normal[0],
    );

    const jwtRegex = /^[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?$/;
    expect(token.accessToken).toMatch(jwtRegex);
    expect(token.refreshToken).toMatch(jwtRegex);
  });

  it("should throw an error when the password is incorrect", async () => {
    const dto = {
      phone: usersForSeed.member.normal[1].phone,
      password: "wrong_password",
    };
    await expect(loginCommand.execute(dto)).rejects.toMatchObject(
      APP_ERROR.WRONG_PASSWORD({ resource: "password" }),
    );

    expect(getUserByPhoneQuery.execute).toHaveBeenCalledWith(dto.phone);

    expect(tokenService.generate).not.toHaveBeenCalled();
  });
});
