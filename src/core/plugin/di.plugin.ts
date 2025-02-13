import { diContainerClassic, fastifyAwilixPlugin } from "@fastify/awilix";
import fastifyPlugin from "fastify-plugin";
import { asClass, asValue, Constructor, Lifetime } from "awilix";

// import { TokenPayload } from "../../module/auth/dto/token.dto.js";
// import { configSchema } from "./env.plugin.js";
import { createCache } from "cache-manager";
// import { FastifyBaseLogger } from "fastify";
import * as kr from "@keyv/redis";
import { DiCradle, diList } from "../../utils/generated/di.generated.js";
import { JwtWithRefresh } from "../../module/auth/types.js";

export const diPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
    injectionMode: "CLASSIC",
  });
  diContainerClassic.register({
    db: asValue(fastify.db),
  });

  diContainerClassic.register({
    config: asValue(fastify.config),
  });

  const keyv = kr.createKeyv();
  const cache = createCache({
    stores: [keyv],
  });

  diContainerClassic.register({
    cache: asValue(cache),
  });

  diContainerClassic.register({
    jwt: asValue(fastify.jwt as JwtWithRefresh),
  });

  // register command and query and service
  for (const item of Object.entries(diList)) {
    diContainerClassic.register({
      [item[0]]: asClass(item[1] as Constructor<any>, {
        lifetime: Lifetime.SCOPED,
      }),
    });
  }

  // move this into auth middleware/plugin
  fastify.addHook("onRequest", async (request, reply) => {
    request.diScope.register({
      tokenPayload: asValue(request.user),
    });
    request.diScope.register({
      log: asValue(request.log),
    });
  });
});

export type CacheType = ReturnType<typeof createCache>;
