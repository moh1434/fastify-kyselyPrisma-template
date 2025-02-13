import fastifyPlugin from "fastify-plugin";
import dotenv from "dotenv";
import { z } from "zod";

const zodEnvBooleanTransform = z
  .enum(["1", "0"])
  .transform((v) => (v === "1" ? true : false));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  DATABASE_URL: z.string().url(),
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
  // Load .env file
  dotenv.config();

  // Validate environment variables using Zod
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    // Throw an error if validation fails
    console.error("Invalid environment variables:", result.error.errors);
    throw new Error("Environment validation failed");
  }

  // Expose validated and type-safe env
  fastify.decorate("config", result.data);
});
