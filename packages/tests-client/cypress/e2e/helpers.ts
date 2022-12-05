import { getActivationCode } from "./ac";

export const fillInput = (name: string, str: string) => {

    cy.get(`input[name=${name}]`).type(str);
}

export const fillInputs = (object: any) => {

    Object
        .keys(object)
        .forEach(x => fillInput(x, object[x]));
}

export const dataTestIdSelector = (testid: string) => `[data-test-id='${testid}']`;

export const clickByTestId = (testid: string, opts: { timeoutInS?: number, noFocus?: boolean } = {}) => {

    const timeoutInS = opts.timeoutInS ? opts.timeoutInS : 20;
    const noFocus = opts.noFocus ? true : false;

    const expr = cy
        .get(dataTestIdSelector(testid), { timeout: timeoutInS * 1000 })
        .should('be.visible')
        .trigger('mouseover');

    if (!noFocus)
        expr.focus()

    expr
        .click({ force: true });
}

export const getUserCredentials = (seed: number) => {

    const PASSWORD = `${seed}_admin123`;
    const EMAIL = `${seed}_testuser_124142@email.com`;

    return {

        email: EMAIL,
        username: `${seed}_testuser_124142`,
        lastName: `${seed}_user`,
        firstName: `${seed}_test`,
        activationCode: getActivationCode(seed),
        password: PASSWORD,
        passwordCompare: PASSWORD
    }
}

const getEnvVar = (varName: string) => {

    if (!process)
        throw new Error(`Error while getting env var, process is null or undefined!`);

    if (!process.env)
        throw new Error(`Error while getting env var, process is null or undefined!`);

    return process.env[varName];
}

export const globalConfig = (() => {

    const varName = 'IS_DOCKERIZED';
    const envValue = getEnvVar(varName);//Cypress.env(varName);
    const isInDocker = envValue === 'true';

    console.log('Getting config...');
    console.log(`${varName}: ${envValue}`);

    return {
        isInDocker
    }
})();

export const getConfigInTest = () => {

    const isInDocker = Cypress.env('isInDocker');
    const config = getConfig(isInDocker);

    console.log(`Api origin: ${config.apiOrigin}`);
    console.log(`Origin: ${config.origin}`);
    console.log(`IsInDocker: ${isInDocker}`);

    return config;
}

export const getConfig = (isInDocker: boolean) => {

    console.log(`Running in docker: ${isInDocker ? 'yes' : 'no'}`);

    const environmentName = isInDocker ? 'epitest' : 'local';

    const origin = `http://${environmentName}.epistogram.com`;
    const apiOrigin = `http://${environmentName}.api.epistogram.com:5000`;

    return {
        origin,
        apiOrigin,
        isInDocker
    }
}