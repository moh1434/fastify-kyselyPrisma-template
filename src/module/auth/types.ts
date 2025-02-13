import { JWT } from "@fastify/jwt";

export type JwtWithRefresh = JWT & {
  refresh: JWT;
};
