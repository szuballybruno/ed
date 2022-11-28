import { Helpers } from "./helpers/helpers";
import { IntegrationTestSuite } from './Integration.test';
import { initJsExtensions } from "@episto/x-core";

initJsExtensions();

await Helpers
    .getSuiteBuilder()
    .addSuites({ IntegrationTestSuite })
    .setAbortOnException('NO')
    .runAllAsync();