import { defineConfig } from "cypress";
import dotenv from "dotenv";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";

dotenv.config();

export default defineConfig({
  allowCypressEnv: false,
  env: {
    baseUrl: process.env.BASE_URL,
  },
  // Configurations for e2e tests
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("cypress-mochawesome-reporter/plugin")(on);
      cypressGrepPlugin(config);

      // Expose specific variables from process.env to Cypress
      config.env.API_SERVER = process.env.API_SERVER;
      config.env.API_KEY = process.env.API_KEY;
      config.env.HOME_URL = process.env.HOME_URL;
      config.env.LOGIN_URL = process.env.LOGIN_URL;
      config.env.LOGIN_EMAIL = process.env.LOGIN_EMAIL;
      config.env.LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

      // Or simply add all process.env variables to Cypress env
      // config.env = { ...process.env, ...config.env };

      return config; // Important: return the updated config
    },
    retries: {
      openMode: 0, // Disable retry in open mode
      runMode: 1, // Retry 1 more time in regression / CI/CD testing
    },
    fixturesFolder: "src/tests/fixtures",
    specPattern: "src/**/*.(api|e2e)-cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter.e2e-config.json",
    },
    screenshotOnRunFailure: false,
  },
  // Configurations for component tests
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    fixturesFolder: "src/tests/fixtures",
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    screenshotOnRunFailure: false,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
