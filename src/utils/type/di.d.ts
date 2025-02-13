import { createCache } from "cache-manager";
import { FastifyBaseLogger } from "fastify";
import { configSchema } from "../../core/plugin/env.plugin.ts";
import { TokenPayload } from "../../module/auth/dto/token.dto.ts";
import { DiCradle } from "../generated/di.generated.ts";
import type { PrismaClient } from "@prisma/client";
import { JwtWithRefresh } from "../../module/auth/types.ts";

declare module "@fastify/awilix" {
  interface Cradle extends DiCradle {
    // add here any fixed dependency like database , command , query , service
    db: PrismaClient;
    config: configSchema;
    cache: ReturnType<typeof createCache>;
    // logger
    log: FastifyBaseLogger;
    jwt: JwtWithRefresh;
    // scoped
    tokenPayload: TokenPayload;
  }
  // interface RequestCradle {
  //   // add here any scoped dependency like token payload or permission or roles

  // }
}
