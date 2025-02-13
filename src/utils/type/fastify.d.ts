import { type TFunction } from "i18next";
import { TokenPayload } from "src/module/auth/dto/token.dto.ts";
import { configSchema } from "../../core/plugin/env.plugin.ts";
import type { PrismaClient, Roles } from "@prisma/client";
import { JwtWithRefresh } from "../../module/auth/types.ts";

// Extend FastifyInstance to include the env property
declare module "fastify" {
  interface FastifyRequest {
    t: TFunction<"ns1", undefined>;
  }
  interface FastifyInstance {
    config: configSchema;
    db: PrismaClient;
    jwt: JwtWithRefresh;
  }

  interface FastifyContextConfig {
    roles: Roles[] | "PUBLIC" | "ANY_USER";
  }
}

// fastify-jwt.d.ts
import "@fastify/jwt";
import { PrismaClient } from "@prisma/client";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    // payload:  TokenPayload ; // payload type is used for signing and verifying
    user: TokenPayload; // user type is return type of `request.user` object
  }
}
