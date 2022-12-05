import { initJsExtensions } from "@episto/x-core";
import { Logger } from "./helpers/Logger";
import { SuiteListBuilder } from "./helpers/TestSuiteBuilder";
import { IntegrationTestSuite } from './Integration.test';

initJsExtensions();

const isInDocker = process.env.IS_DOCKERIZED === 'true';
const environmentName = isInDocker ? 'epitest' : 'local';
const origin = `http://${environmentName}.epistogram.com`;

Logger.log(`Tests started...`);
Logger.log(`Origin is: ${origin}`);

await new SuiteListBuilder({
    environmentName,
    applyDefaultConfig: (defaults) => {

        defaults.headers['Origin'] = origin;
    }
})
    .addSuites({ IntegrationTestSuite })
    .setAbortOnException('NO')
    .runAllAsync();