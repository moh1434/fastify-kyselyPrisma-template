import fastifyPlugin from "fastify-plugin";

import { type Prisma, PrismaClient } from "@prisma/client";
import { prismaConfig } from "../../utils/prisma.config.js";

export const prismaLoadPlugin = fastifyPlugin(async (fastify, opts) => {
  const prisma = new PrismaClient<Prisma.PrismaClientOptions, "query">(
    prismaConfig,
  );

  fastify.decorate("db", prisma);

  fastify.addHook("onClose", async (server) => {
    await server.db.$disconnect();
  });
});
