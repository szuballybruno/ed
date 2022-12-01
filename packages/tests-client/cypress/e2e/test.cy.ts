import { fillInputs, clickButton } from "./helpers";

it('Register new user via activation code test', () => {

    cy.visit('/register-via-activation-code');

    fillInputs({
        email: 'testuser.email.com',
        username: 'testuser',
        lastName: 'user',
        firstName: 'test',
        activationCode: 'DEVTEST-1',
        password: 'admin123',
        passwordCompare: 'admin123'
    });

    clickButton('register-button');

    cy.url().should('include', '/home');
})