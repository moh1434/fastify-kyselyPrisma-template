import dotenv from "dotenv";
export function registerDotEnv() {
  const envFile =
    process.env.NODE_ENV === "production"
      ? ".env.prod"
      : process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env";
  dotenv.config({ path: envFile });
}
