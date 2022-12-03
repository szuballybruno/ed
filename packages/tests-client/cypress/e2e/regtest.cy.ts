import { fillInputs, clickByTestId } from "./helpers";

it('Register new user via activation code test', () => {

    cy.visit('/register-via-activation-code');

    fillInputs({
        email: 'testuser_124142@email.com',
        username: 'testuser_124142',
        lastName: 'user',
        firstName: 'test',
        activationCode: 'DEVTEST-2',
        password: 'admin123',
        passwordCompare: 'admin123'
    });

    clickByTestId('register-button');

    cy.url({ timeout: 20 * 1000 }).should('include', '/survey');
});

it('Visit survey, and complete it, and wait for redirect to home', () => {

    clickByTestId('survey-next-button');

    for (let index = 0; index <= 34; index++) {

        clickByTestId(`survey-option-qi:${index}-ai:1`);
    }

    clickByTestId('survey-next-button');

    cy.url({ timeout: 20 * 1000 }).should('include', '/home');
});