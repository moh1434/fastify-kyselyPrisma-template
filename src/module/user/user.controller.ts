import { baseController } from "../shared/base.controller.js";
import { profileUpdateDto } from "./dto/profileUpdate.dto.js";

export const userController = baseController(
  async (fastify) => {
    fastify.get(
      "/profile",
      {
        config: {
          roles: "ANY_USER",
        },
      },
      async (request, reply) => {
        return await fastify.diContainer.cradle.getUserByIdQuery.execute(
          request.tokenData.id,
        );
      },
    );
    fastify.patch(
      "/profile",
      {
        config: {
          roles: "ANY_USER",
        },
        schema: {
          body: profileUpdateDto,
        },
      },
      async (request, reply) => {
        return await fastify.diContainer.cradle.updateProfileCommand.execute(
          request.tokenData.id,
          request.body,
        );
      },
    );
  },
  { tag: "user" },
);
