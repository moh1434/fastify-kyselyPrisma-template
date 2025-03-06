import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { loginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import GetUserByPhoneQuery from "../queries/getUserByPhone.query.js";
import { TokenService } from "../../service/token.service.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";
import LoginCommand from "./login.command.js";
import { fastify } from "../../../../core/main.js";
import { User } from "../../../../db/types.js";
import { defaultTestPassword } from "../../../../utils/test/generateUsers.js";
import { seedUsers } from "../../../../db/data/usersSeedPayload.js";
import { spyAllMethods } from "../../../../utils/test/spyAllMethods.js";

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
      phone: seedUsers.member.normal[0].phone,
      password: "testTest",
    };

    const { token } = await loginCommand.execute(dto);

    expect(getUserByPhoneQuery.execute).toHaveBeenCalledWith(dto.phone);
    expect(passwordService.verify).toHaveBeenCalledWith(
      dto.password,
      seedUsers.member.normal[0].password,
    );
    expect(tokenService.generate).toHaveBeenCalledWith(
      seedUsers.member.normal[0],
    );

    const jwtRegex = /^[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?$/;
    expect(token.accessToken).toMatch(jwtRegex);
    expect(token.refreshToken).toMatch(jwtRegex);
  });

  it("should throw an error when the password is incorrect", async () => {
    const dto = {
      phone: seedUsers.member.normal[1].phone,
      password: "wrong_password",
    };
    expect(loginCommand.execute(dto)).rejects.toMatchObject(
      APP_ERROR.WRONG_PASSWORD({ resource: "password" }),
    );

    expect(getUserByPhoneQuery.execute).toHaveBeenCalledWith(dto.phone);

    expect(tokenService.generate).not.toHaveBeenCalled();
  });
});
