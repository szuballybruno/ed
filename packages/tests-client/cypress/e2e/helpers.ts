
export const fillInput = (name: string, str: string) => {

    cy.get(`input[name=${name}]`).type(str);
}

export const fillInputs = (object: any) => {

    Object
        .keys(object)
        .forEach(x => fillInput(x, object[x]));
}

export const clickButton = (testid: string) => {

    cy.get(`[data-test-id="${testid}"]`).click();
}