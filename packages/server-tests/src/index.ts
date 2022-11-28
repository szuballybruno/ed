import { initJsExtensions } from "@episto/x-core";
import { SuiteListBuilder } from "./helpers/TestSuiteBuilder";
import { IntegrationTestSuite } from './Integration.test';

initJsExtensions();

await new SuiteListBuilder()
    .addSuites({ IntegrationTestSuite })
    .setAbortOnException('NO')
    .runAllAsync();