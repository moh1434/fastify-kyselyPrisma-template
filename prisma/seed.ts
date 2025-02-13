// import { type Prisma, PrismaClient } from "@prisma/client";
// const { hash } = new PasswordService();

// const prisma = new PrismaClient<Prisma.PrismaClientOptions, "query">({
//   datasources: { db: { url: process.env.DATABASE_URL } },
// });
init();

export let defualtPassword = "";
async function init() {
  if (process.env.SEED_DEBUG! == "TRUE") {
    // defualtPassword = await hash("12345678");
  }
}
