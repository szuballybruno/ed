import { clickByTestId, fillInputs, getConfig, getUserCredentials } from "./helpers";

const CREDENTIALS = getUserCredentials(0);

console.log(CREDENTIALS);

describe('Registration tests', () => {

    it('Register new user via activation code test', () => {

        const isInDocker = Cypress.env('isInDocker');
        const { apiOrigin, origin } = getConfig(isInDocker);

        console.log(`Api origin: ${apiOrigin}`);
        console.log(`Origin: ${origin}`);
        console.log(`IsInDocker: ${isInDocker}`);
        // console.log(`Env via process: ${JSON.stringify(process ? process.env : undefined)}`);
        // console.log(`Env (IS_DOCKERIZED) via Cypress: ${Cypress.env('IS_DOCKERIZED')}`);
        // console.log(`Env (IS_DOCKERIZED) via Cypress: ${Cypress.env('asd')}`);

        cy.visit('/register-via-activation-code');

        const {
            email,
            activationCode,
            firstName,
            lastName,
            password,
            passwordCompare,
            username
        } = CREDENTIALS;

        fillInputs({
            email,
            activationCode,
            firstName,
            lastName,
            password,
            passwordCompare,
            username
        });

        clickByTestId('register-button');

        cy.url({ timeout: 20 * 1000 }).should('include', '/survey');
    });

    // it('Visit survey, and complete it, and wait for redirect to home', () => {

    //     const { apiOrigin, origin, isInDocker } = getConfig();

    //     console.log(`Api origin: ${apiOrigin}`);
    //     console.log(`Origin: ${origin}`);
    //     console.log(`IsInDocker: ${isInDocker}`);
    //     console.log(`Env via process: ${JSON.stringify(process ? process.env : undefined)}`);
    //     console.log(`Env (IS_DOCKERIZED) via Cypress: ${Cypress.env('IS_DOCKERIZED')}`);
    //     console.log(`Env (IS_DOCKERIZED) via Cypress: ${Cypress.env('asd')}`);

    //     const body = {
    //         email: CREDENTIALS.email,
    //         password: CREDENTIALS.password,
    //     };

    //     cy.request({
    //         method: 'POST',
    //         url: `${apiOrigin}/authentication/login-user`,
    //         body: body,
    //         headers: {
    //             'Origin': origin
    //         },
    //     });

    //     cy.visit('/survey');
    //     cy.wait(4000);

    //     clickByTestId('greet-slide-survey-next-button');

    //     for (let index = 0; index <= 34; index++) {

    //         clickByTestId(`survey-option-qi:${index}-ai:1`, { noFocus: true });
    //     }

    //     clickByTestId('summary-slide-survey-next-button');

    //     cy.url({ timeout: 20 * 1000 }).should('include', '/home');
    // });
});