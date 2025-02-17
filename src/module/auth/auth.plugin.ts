import fastifyPlugin from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";
import { TokenPayload } from "./dto/token.dto.js";
import { APP_ERROR } from "../../utils/error/predefine-error.js";
// import fastifyPassport from "@fastify/passport";

// import {
//   Strategy as JwtStrategy,
//   ExtractJwt,
//   StrategyOptionsWithoutRequest,
// } from "passport-jwt";

export const setupAuthPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.register(fastifyJWT, {
    secret: fastify.config.JWT_SECRET_KEY,
  });
  fastify.register(fastifyJWT, {
    secret: fastify.config.JWT_REFRESH_SECRET_KEY,
    namespace: "refresh",
  });

  fastify.addHook("onRequest", async (request, reply) => {
    // Skip public routes
    if (
      request.routeOptions.config.roles === "PUBLIC" ||
      // Skip routes that start with /doc which is swagger
      request.url.startsWith(fastify.config.SWAGGER_DOCS_LINK)
    ) {
      return;
    }

    if (!request?.routeOptions?.config?.roles) {
      throw APP_ERROR.INTERNAL_SERVER_ERROR(undefined, {
        message: "request.routeOptions.config is undefined",
        url: request.url,
        method: request.method,
      });
    }

    const tokenPayload = await request.jwtVerify<TokenPayload>();
    if (request.routeOptions.config.roles === "ANY_USER") {
      return;
    }
    if (request.routeOptions.config.roles.includes(tokenPayload.role)) {
      return;
    }

    throw APP_ERROR.FORBIDDEN({
      current_role: tokenPayload.role || "undefined",
      accepted_roles: request.routeOptions.config.roles.join(","),
    });
  });
});
