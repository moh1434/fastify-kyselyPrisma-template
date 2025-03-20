import { execSync } from "child_process";

export default async () => {
  execSync("dotenv -e .env.test pnpm run seed", { stdio: "inherit" }); // Runs your seed script
};
