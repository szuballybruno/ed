import { fillInputs, clickByTestId } from "./helpers";

const SEED = 1;
const PASSWORD = `${SEED}_admin123`;
const EMAIL = `${SEED}_testuser_124142@email.com`;

describe('Registration tests', () => {

    it('Register new user via activation code test', () => {

        cy.visit('/register-via-activation-code');

        fillInputs({
            email: EMAIL,
            username: `${SEED}_testuser_124142`,
            lastName: `${SEED}_user`,
            firstName: `${SEED}_test`,
            activationCode: 'DEVTEST-2',
            password: PASSWORD,
            passwordCompare: PASSWORD
        });

        clickByTestId('register-button');

        cy.url({ timeout: 20 * 1000 }).should('include', '/survey');
    });

    it('Visit survey, and complete it, and wait for redirect to home', () => {

        cy.request('POST', '/authentication/login-user', {
            email: EMAIL,
            password: PASSWORD,
        });

        cy.visit('/survey');

        clickByTestId('survey-next-button');

        for (let index = 0; index <= 34; index++) {

            clickByTestId(`survey-option-qi:${index}-ai:1`);
        }

        clickByTestId('survey-next-button');

        cy.url({ timeout: 20 * 1000 }).should('include', '/home');
    });
});