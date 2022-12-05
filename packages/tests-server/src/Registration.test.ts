import { RegisterUserViaActivationCodeDTO } from "@episto/communication";
import { AxiosError } from "axios";
import { Helpers } from "./helpers/helpers";
import { test, testSuite } from "./helpers/TestSuiteBuilder";

const ACTIVATION_CODE = 'DEVTEST-1';
const EMAIL = 'testuser1@email.com';
const FIRST_NAME = 'Ben';
const LAST_NAME = 'Szilassy';
const PASSWORD = 'admin123';
const USERNAME = 'ben.szilassy';

let accessToken = '';

const asAxiosError = (error: any) => (error?.axiosError as AxiosError | null);

export const RegistrationTestSuite = testSuite(async () => [

    test('Register user via activation code', async ({ context }) => {

        const response = await context
            .postAsync<RegisterUserViaActivationCodeDTO>(x => x.registration.registerViaActivationCode, {
                activationCode: ACTIVATION_CODE,
                emailAddress: EMAIL,
                firstName: FIRST_NAME,
                lastName: LAST_NAME,
                password: PASSWORD,
                passwordCompare: PASSWORD,
                username: USERNAME
            });

        const accessTokenValue = Helpers
            .findSetCookieHeaderValue(response, 'epi_access_token');

        accessToken = accessTokenValue;
    }),

    test('Login', async ({ context }) => {

        const response = await context
            .postAsync(x => x.authentication.loginUser, CONSTANTS.VALID_CREDENTIALS_BODY);

        const accessTokenValue = Helpers
            .findSetCookieHeaderValue(response, 'epi_access_token');

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