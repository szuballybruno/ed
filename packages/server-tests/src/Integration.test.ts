import { Helpers, test, testSuite } from "./helpers/helpers";

export const IntegrationTestSuite = testSuite(async () => [

    test('the data is peanut butter', async () => {

        const data = await Helpers
            .postAsync(x => x.authentication.loginUser, {
                email: 'endre.marosi@email.com',
                password: 'admin'
            });

        // if (data !== 'peanut butter')
        //     throw new Error('asd');
    }),

    test('GET companies', async () => {

        const data = await Helpers
            .fetchAsync(x => x.companies.getCompanies, { asd: 1 });

        if (data !== 'peanut butter')
            throw new Error('asd');
    })
]);