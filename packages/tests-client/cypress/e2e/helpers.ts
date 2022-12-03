import { getActivationCode } from "./ac";

export const fillInput = (name: string, str: string) => {

    cy.get(`input[name=${name}]`).type(str);
}

export const fillInputs = (object: any) => {

    Object
        .keys(object)
        .forEach(x => fillInput(x, object[x]));
}

export const clickByTestId = (testid: string, timeoutInS?: number) => {

    const timeout = timeoutInS
        ? timeoutInS * 10
        : 1000 * 10;

    cy.get(`[data-test-id="${testid}"]`, { timeout }).click();
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

export const getConfig = () => {

    const getEnvVar = (varName: string) => {

        if (!process)
            throw new Error(`Error while getting env var, process is null or undefined!`);

        if (!process.env)
            throw new Error(`Error while getting env var, process is null or undefined!`);

        return process.env[varName];
    }

    const varName = 'IS_DOCKERIZED';
    const envValue = getEnvVar(varName);//Cypress.env(varName);
    const isInDocker = envValue === 'true';
    const environmentName = isInDocker ? 'epitest' : 'local';

    console.log('Getting config...');
    console.log(`${varName}: ${envValue}`);

    const origin = `http://${environmentName}.epistogram.com`;
    const apiOrigin = `http://${environmentName}.api.epistogram.com:5000`;

    return {
        origin,
        apiOrigin,
        isInDocker
    }
}