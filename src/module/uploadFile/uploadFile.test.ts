import { describe, it, expect, beforeAll } from "vitest";
import { fastify } from "../../core/main.js";
import FormData from "form-data";
import { usersForSeed } from "../../db/data/usersSeedPayload.js";
import { readFileSync } from "fs";
import { UPLOAD_DIR } from "../../utils/rootDirectory.js";
import path from "path";
import { APP_ERROR } from "../../utils/error/appErrors.js";
import { WITHOUT_PERMISSION_TOKEN } from "../../db/data/constantsForTest.js";

describe("Auth Controller", () => {
  let form: FormData;
  //available after register test
  let registeredUserId: string;

  const user0 = usersForSeed.member.normal[0];
  //available after login test
  let tokens: {
    accessToken: string;
    refreshToken: string;
  };

  beforeAll(async () => {
    await fastify?.ready();

    tokens = fastify!.diContainer.cradle.tokenService.generate(user0).token;

    form = new FormData();

    form.append(
      "file",
      readFileSync(path.join(UPLOAD_DIR, "/icon_for_tests.jpeg")),
    );
  });

  it.sequential(
    "should throw an error if the user is not authorized",
    async () => {
      const response = await fastify!.inject({
        url: "/upload/file",
        method: "POST",
        payload: form.getBuffer(),
        headers: {
          ...form.getHeaders(),
          authorization: WITHOUT_PERMISSION_TOKEN,
        },
      });
      const responseBody = JSON.parse(response.body);
      const { httpStatus, code } = APP_ERROR.FORBIDDEN();
      expect(responseBody.statusCode).toBe(httpStatus);
      expect(responseBody.code).toBe(code);
    },
  );
});
