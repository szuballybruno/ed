import { fillInputs, clickButton } from "./helpers";

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

    clickButton('register-button');

    cy.url({ timeout: 20 * 1000 }).should('include', '/survey');
})