import { initJsExtensions } from "@episto/x-core";
import { SuiteListBuilder } from "./helpers/TestSuiteBuilder";
import { IntegrationTestSuite } from './Integration.test';

initJsExtensions();

await new SuiteListBuilder({
    applyDefaultConfig: (defaults) => {

        defaults.headers['Origin'] = 'http://local.epistogram.com';
    }
})
    .addSuites({ IntegrationTestSuite })
    .setAbortOnException('NO')
    .runAllAsync();