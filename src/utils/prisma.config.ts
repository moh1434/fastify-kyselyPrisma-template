import { type Prisma } from "@prisma/client";

export const prismaConfig: Readonly<Prisma.PrismaClientOptions> = {
  datasources: { db: { url: process.env.DATABASE_URL } },
  omit: {
    // user: {
    //   password: true,
    // },
  },
  ...{
    log:
      process.env.NODE_ENV === "production"
        ? [
            {
              emit: "event",
              level: "query",
            },
            {
              emit: "stdout",
              level: "error",
            },
            {
              emit: "stdout",
              level: "info",
            },
            {
              emit: "stdout",
              level: "warn",
            },
          ]
        : undefined,
  },
};
