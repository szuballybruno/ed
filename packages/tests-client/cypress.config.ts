import { defineConfig } from "cypress";
import { getConfigOutsideOfTest } from "./cypress/e2e/helpers";

const { origin, isInDocker } = getConfigOutsideOfTest();

export default defineConfig({
  e2e: {
    baseUrl: origin,
    setupNodeEvents(on, config) {
      on('after:run', (results) => {

        console.log(`
        -----------------------------
        [after:run] Test run finshed!
        -----------------------------
        `);
      })
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
