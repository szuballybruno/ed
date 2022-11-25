import { initJsExtensions } from '../src/shared/logic/jsExtensions';
import { startCourse } from './common/courseFlow';
import { setupIntegrationTest } from './misc/base';

initJsExtensions();

setupIntegrationTest('Full course process, from start to finish')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();
        await startCourse(testParams);
    })
    .build();