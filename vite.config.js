import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    isolate: false, // This ensures all tests share the same module instance
    // setupFiles: "./src/utils/type/index.ts",
    globals: true, // Enables global variables like globalThis
  },
});
