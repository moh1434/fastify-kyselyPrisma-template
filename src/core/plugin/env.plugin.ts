import fastifyPlugin from "fastify-plugin";
import { z } from "zod";
import dotenv from "dotenv";

const zodEnvBooleanTransform = z
  .enum(["1", "0"])
  .transform((v) => (v === "1" ? true : false));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  //
  KYSELY_DATABASE: z.string(),
  KYSELY_HOST: z.string(),
  KYSELY_PASSWORD: z.string(),
  KYSELY_USER: z.string(),
  KYSELY_PORT: z.string().regex(/^\d+$/).transform(Number),
  KYSELY_MAX_CONNECTIONS_PER_CLUSTER: z
    .string()
    .regex(/^\d+$/)
    .transform(Number),
  //
  SWAGGER_DOCS_LINK: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES: z.string(),
  JWT_REFRESH_EXPIRES: z.string(),
  JWT_REFRESH_SECRET_KEY: z.string(),

  ENABLE_DEBUG_i18N: zodEnvBooleanTransform,
  ENABLE_FASTIFY_LOGGER: zodEnvBooleanTransform,
});

export type configSchema = z.infer<typeof envSchema>;

export const envPlugin = fastifyPlugin(async (fastify, opts) => {
  // Validate environment variables using Zod
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    // Throw an error if validation fails
    console.error("Invalid environment variables:", result.error.errors);
    throw new Error("Environment validation failed");
  }
  console.log(result.data);
  // Expose validated and type-safe env
  fastify.decorate("config", result.data);
});

export function registerDotEnv() {
  const envFile =
    process.env.NODE_ENV === "production"
      ? ".env.prod"
      : process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env";
  dotenv.config({ path: envFile });
}
