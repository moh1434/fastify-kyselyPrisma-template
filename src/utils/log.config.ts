import { FastifyLoggerOptions } from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger.js";

export function loggingConfig(): FastifyLoggerOptions & PinoLoggerOptions {
  return {
    transport:
      process.env.ENABLE_FASTIFY_LOGGER === "1"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname,reqId,err", // Hide unnecessary fields
              messageFormat: "{msg}",
            },
          }
        : undefined,
  };
}
