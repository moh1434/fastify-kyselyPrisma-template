import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    fileParallelism: false,
    isolate: false, // This ensures all tests share the same module instance
    globals: true, // Enables global variables like globalThis
    // setupFiles: ["src/utils/test/vitestSetupFiles.ts"],
    globalSetup: ["src/utils/test/vitestGlobalFiles.ts"],
    watch: false,
  },
});
