import { Helpers } from "./helpers/helpers";
import { test, testSuite } from "./helpers/TestSuiteBuilder";

export const IntegrationTestSuite = testSuite(async () => [

    test('Login', async () => {

        const response = await Helpers
            .postAsync(x => x.authentication.loginUser, {
                email: 'endre.marosi@epistogram.com',
                password: 'admin'
            }, {
                origin: 'http://local.epistogram.com'
            });

        if (!response.headers["set-cookie"]?.some(x => x.startsWith('epi_access_token')))
            throw new Error('No access token recieved!');
    }),

    test('GET companies', async () => {

        const response = await Helpers
            .fetchAsync(x => x.companies.getCompanies, { asd: 1 });

        if (response.data !== 'peanut butter')
            throw new Error('asd');
    })
]);