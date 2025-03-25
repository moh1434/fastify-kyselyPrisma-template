import { describe, it, expect, beforeAll } from "vitest";
import { fastify } from "../../core/main.js";

import { TEST_PASSWORD } from "../../utils/test/generateUsers.js";

import { usersForSeed } from "../../db/data/usersSeedPayload.js";
import { profileUpdateDto } from "./dto/profileUpdate.dto.js";
import { LoginDto } from "../auth/dto/login.dto.js";

describe("Auth Controller", () => {
  const loginDto: LoginDto = {
    phone: usersForSeed.member.normal[0].phone,
    password: TEST_PASSWORD,
  };

  const profileUpdateDto: profileUpdateDto = {
    firstName: "Test",
    secondName: "Second",
    thirdName: "Third",
  };

  let loginTokens: {
    accessToken: string;
    refreshToken: string;
  };

  beforeAll(async () => {
    await fastify?.ready();

    loginTokens = (
      await fastify!.diContainer.cradle.loginCommand.execute(loginDto)
    ).token;
  });

  it.sequential("should register a new user", async () => {
    const oldProfile =
      await fastify!.diContainer.cradle.getUserByPhoneQuery.execute(
        loginDto.phone,
      );

    const response = await fastify!.inject({
      url: "/user/profile",
      method: "PATCH",
      body: profileUpdateDto,
      headers: {
        authorization: `Bearer ${loginTokens.accessToken}`,
      },
    });

    expect(response?.statusCode).toBe(200);

    const updatedProfile =
      await fastify!.diContainer.cradle.getUserByPhoneQuery.execute(
        loginDto.phone,
      );

    expect(updatedProfile.fullName).toBeDefined();

    expect(updatedProfile.fullName).not.toBe(oldProfile.fullName);
  });
});
