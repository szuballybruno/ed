
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