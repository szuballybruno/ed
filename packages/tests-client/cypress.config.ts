import { defineConfig } from "cypress";

const isInDocker = process.env.IS_DOCKERIZED === 'true';
const environmentName = isInDocker ? 'epitest' : 'local';
export const origin = `http://${environmentName}.epistogram.com`;

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
