import { Helpers, test, testSuite } from "./helpers/helpers";

export const IntegrationTestSuite = testSuite(async () => [

    test('the data is peanut butter', async () => {

        const data = await Helpers
            .fetchAsync(x => x.authentication.loginUser, { asd: 1 });

        if (data !== 'peanut butter')
            throw new Error('asd');
    })
]);