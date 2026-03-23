import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  allowCypressEnv: false,
  env: {
    baseUrl: process.env.BASE_URL,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(_, config) {
      config.env.API_SERVER = process.env.API_SERVER;
      config.env.API_KEY = process.env.API_KEY;
      config.env.HOME_URL = process.env.HOME_URL;
      config.env.LOGIN_URL = process.env.LOGIN_URL;
      config.env.LOGIN_EMAIL = process.env.LOGIN_EMAIL;
      config.env.LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
      return config;
    },
    fixturesFolder: "src/tests/fixtures",
    specPattern: "src/**/*.(e2e|api)-cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    fixturesFolder: "src/tests/fixtures",
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
