import { KyselyDB } from "./kysely";
import { type TFunction } from "i18next";
import { TokenPayload } from "src/module/auth/dto/token.dto.ts";
import { configSchema } from "../../core/plugin/env.plugin.ts";
import { JwtWithRefresh } from "../../module/auth/types.ts";

// Extend FastifyInstance to include the env property

declare module "fastify" {
  interface FastifyRequest {
    t: TFunction<"ns1", undefined>;
  }
  interface FastifyInstance {
    config: configSchema;
    db: KyselyDB;
    jwt: JwtWithRefresh;
  }

  interface FastifyContextConfig {
    roles: Roles[] | "PUBLIC" | "ANY_USER";
  }
}

// fastify-jwt.d.ts
import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    // payload:  TokenPayload ; // payload type is used for signing and verifying
    user: TokenPayload; // user type is return type of `request.user` object
  }
}
