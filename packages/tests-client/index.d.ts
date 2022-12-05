declare namespace Cypress {
    interface Chainable {
        printLog(value: string): Chainable<void>;
    }
}