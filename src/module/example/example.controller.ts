import { baseController } from "../shared/base.controller.js";
import { exampleDto } from "./dto/example.dto.js";

export const exampleController = baseController(
  async (fastify) => {
    fastify.post(
      "/example",
      {
        config: {
          roles: "PUBLIC",
        },
        schema: {
          body: exampleDto,
          querystring: exampleDto,
          params: exampleDto,
        },
      },
      async (request, reply) => {},
    );
  },
  { tag: "example" },
);
