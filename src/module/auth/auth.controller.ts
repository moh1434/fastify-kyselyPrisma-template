import { baseController } from "../shared/base.controller.js";
import { loginDto } from "./dto/login.dto.js";
import { refreshTokenDto } from "./dto/refresh-token.dto.js";
import { registerDto } from "./dto/register.dto.js";

export const authController = baseController(
  async (fastify) => {
    fastify.post(
      "/login",
      {
        config: {
          roles: "PUBLIC",
        },
        schema: {
          body: loginDto,
        },
      },
      async (request, reply) => {
        return await request.diScope.cradle.loginCommand.execute(request.body);
      },
    );
    fastify.post(
      "/use-refresh-token",
      {
        config: {
          roles: "PUBLIC",
        },
        schema: {
          headers: refreshTokenDto,
        },
      },
      async (request, reply) => {
        const headers: refreshTokenDto = request.headers;
        return await request.diScope.cradle.refreshTokenCommand.execute(
          headers.authorization,
        );
      },
    );
    fastify.post(
      "/register",
      {
        config: {
          roles: "GUEST_ONLY",
        },
        schema: {
          body: registerDto,
        },
      },
      async (request, reply) => {
        return await request.diScope.cradle.registerUserCommand.execute(
          request.body,
        );
      },
    );
  },

  { tag: "auth" },
);
