import { fileURLToPath } from "url";
import path from "path";

export const rootDirectory = path
  .dirname(fileURLToPath(import.meta.url))
  .replace(/\/src\/utils$/, "");

export const UPLOAD_DIR = path.resolve(rootDirectory, "uploads");
