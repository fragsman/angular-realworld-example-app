import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1900,
  env: {
    username: "anemail@domain.com",
    password: "ronnie1234"
  },
  retries: 1,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
      baseUrl: "http://localhost:4200",
      specPattern: "cypress/e2e/**/*.*.{js,jsx,ts,tsx}",
      excludeSpecPattern: ["cypress/e2e/1-getting-started/*", "cypress/e2e/2-advanced-examples/*"]
  },
});
