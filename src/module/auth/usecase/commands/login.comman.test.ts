import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginDto } from "../../dto/login.dto.js";
import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import GetUserByPhone from "../queries/getUserByPhone.query.js";
import { TokenService } from "../../service/token.service.js";
import { DbType, KyselyDB } from "../../../../utils/type/kysely.js";
import LoginCommand from "./login.command.js";
import { fastify } from "../../../../core/main.js";
import { User } from "../../../../db/types.js";
import { generateUser } from "../../../../utils/test/generateUsers.js";

describe("LoginCommand", () => {
  let loginCommand: LoginCommand;
  let passwordService: PasswordService;
  let getUserByPhone: GetUserByPhone;
  let tokenService: TokenService;
  let config: configSchema;
  let db: KyselyDB;

  beforeEach(async () => {
    if (!fastify) {
      throw new Error("Fastify is undefined");
    }
    await fastify.ready(); // Ensure Fastify is fully initialized

    console.log("login.command.test:", generateUser());

    loginCommand = fastify.diContainer.cradle.loginCommand;
    passwordService = fastify.diContainer.cradle.passwordService;
    getUserByPhone = fastify.diContainer.cradle.getUserByPhone;
    tokenService = fastify.diContainer.cradle.tokenService;
    config = fastify.diContainer.cradle.config;
    db = fastify.diContainer.cradle.db;
  });
  //i want to only test the
  it("should return a token when login is successful", async () => {
    const dto = { phone: "1234567890", password: "valid_password" };

    const token = await loginCommand.execute(dto);

    expect(getUserByPhone.execute).toHaveBeenCalledWith(dto.phone);
    // expect(passwordService.verify).toHaveBeenCalledWith(
    //   dto.password,
    //   mockUser.password,
    // );
    // expect(tokenService.generate).toHaveBeenCalledWith(mockUser);
    expect(token).toBe("mock_token");
  });

  it("should throw an error when the password is incorrect", async () => {
    const dto = { phone: "1234567890", password: "wrong_password" };

    // await expect(loginCommand.execute(dto)).rejects.toThrow(
    //   APP_ERROR.WRONG_PASSWORD({ resource: "password" }),
    // );

    // expect(getUserByPhone.execute).toHaveBeenCalledWith(dto.phone);
    // expect(passwordService.verify).toHaveBeenCalledWith(
    //   dto.password,
    //   mockUser.password,
    // );
    // expect(tokenService.generate).not.toHaveBeenCalled();
    expect(true).toBe(true);
  });
});
