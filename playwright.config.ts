import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "scroll-parity.spec.ts",
  timeout: 120000,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  webServer: {
    command: "node tests/static-server.cjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
