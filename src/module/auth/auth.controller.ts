import { baseController } from "../shared/base.controller.js";
import { LoginDto } from "./dto/login.dto.js";
import { refreshTokenDto } from "./dto/refresh-token.dto.js";
import { RegisterDto } from "./dto/register.dto.js";

export const authController = baseController(
  async (fastify) => {
    fastify.post(
      "/login",
      {
        config: {
          roles: "PUBLIC",
        },
        schema: {
          body: LoginDto,
        },
      },
      async (request, reply) => {
        return await fastify.diContainer.cradle.loginCommand.execute(
          request.body,
        );
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
        return await fastify.diContainer.cradle.refreshTokenCommand.execute(
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
          body: RegisterDto,
        },
      },
      async (request, reply) => {
        return await fastify.diContainer.cradle.registerUserCommand.execute(
          request.body,
        );
      },
    );
  },

  { tag: "auth" },
);
