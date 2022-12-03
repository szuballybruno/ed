import { defineConfig } from "cypress";
import { getConfig } from "./cypress/e2e/helpers";

const { origin, isInDocker } = getConfig();

export default defineConfig({
  e2e: {
    baseUrl: origin,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  hosts: isInDocker
    ? undefined
    : {
      "local.epistogram.com": "127.0.0.1"
    }
});
