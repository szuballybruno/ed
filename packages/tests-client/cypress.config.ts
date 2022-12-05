import { defineConfig } from "cypress";
import { getConfig, globalConfig } from "./cypress/e2e/helpers";

const { isInDocker } = globalConfig;
const { origin } = getConfig(isInDocker);

export default defineConfig({
  e2e: {
    baseUrl: origin,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      isInDocker: isInDocker
    }
  },
  hosts: isInDocker
    ? undefined
    : {
      "local.epistogram.com": "127.0.0.1"
    }
});
