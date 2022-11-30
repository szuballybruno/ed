import { AxiosError } from "axios";
import { Helpers } from "./helpers/helpers";
import { test, testSuite } from "./helpers/TestSuiteBuilder";

const CONSTANTS = {
    CORRUPT_REQUEST_URL: 'http://epitest.corrupt_epistogram.com',
    VALID_CREDENTIALS_BODY: {
        email: 'endre.marosi@epistogram.com',
        password: 'admin'
    }
}

let accessToken = '';

const asAxiosError = (error: any) => (error?.axiosError as AxiosError | null);

export const IntegrationTestSuite = testSuite(async () => [

    test('Login with corrupt url', async ({ context }) => {

        await Helpers
            .shouldThrow(error => asAxiosError(error)?.response?.status === 500)
            .execute(() => context
                .overwriteRequestDefaults({
                    origin: CONSTANTS.CORRUPT_REQUEST_URL
                })
                .postAsync(x => x.authentication.loginUser, CONSTANTS.VALID_CREDENTIALS_BODY));
    }),

    test('Login', async ({ context }) => {

        const response = await context
            .postAsync(x => x.authentication.loginUser, CONSTANTS.VALID_CREDENTIALS_BODY);

        const setCookies = response.headers["set-cookie"] ?? [];

        if (!setCookies?.some(x => x.startsWith('epi_access_token')))
            throw new Error('No access token recieved!');

        const accessTokenValue = setCookies
            .single(x => x.startsWith('epi_access_token'))
            .split(';')[0]
            .split('=')[1];

        accessToken = accessTokenValue;
    }),

    test('Get companies after login', async ({ context }) => {

        const response = await context
            .setAuthToken(accessToken)
            .fetchAsync(x => x.companies.getCompanies, { asd: 1 });

        Helpers
            .throwIf(!response.data.some(x => x.name === 'EpistoGram'));
    })
]);