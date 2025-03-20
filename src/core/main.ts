import { registerDotEnv } from "../utils/helpers/registerDotEnv.js";
registerDotEnv();
import { envPlugin } from "./plugin/env.plugin.js";
import Fastify from "fastify";
import helmet from "@fastify/helmet";
import FastifyMultipart from "@fastify/multipart";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { setupControllersPlugin } from "./plugin/controller.plugin.js";
import { swaggerLoadPlugin } from "./plugin/swagger.plugin.js";
import { diPlugin } from "./plugin/di.plugin.js";

import { loggingConfig } from "../utils/log.config.js";
import { setupErrorPlugin } from "./plugin/error.plugin.js";
import { setupI18Plugin } from "./plugin/i18.plugin.js";
import { setupAuthPlugin } from "../module/auth/auth.plugin.js";
import { kyselyLoadPlugin } from "./plugin/kysely.plugin.js";
async function init() {
  const fastify = Fastify({
    logger: loggingConfig(),
  });
  fastify.register(setupErrorPlugin);
  fastify.register(helmet, { global: true });

  fastify.register(FastifyMultipart, { attachFieldsToBody: true });
  // setup zod
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // setup env
  await app.register(envPlugin);

  await app.register(kyselyLoadPlugin);
  await app.register(swaggerLoadPlugin);

  app.register(setupI18Plugin);
  app.register(setupAuthPlugin);
  app.register(diPlugin);
  app.register(setupControllersPlugin);

  await app.ready();

  ["SIGINT", "SIGTERM"].forEach(async (signal) => {
    process.on(signal, async () => {
      await fastify.close();
      process.exit(0);
    });
  });
  if (process.env.NODE_ENV === "test") {
    return app;
  }
  // Run the server!
  app.listen({ port: app.config.PORT }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`NODE_ENV=${process.env.NODE_ENV}`);
    fastify.log.info(
      `Swagger endpoint: ${address}${app.config.SWAGGER_DOCS_LINK}`,
    );
  });
}

export const fastify = await init();
