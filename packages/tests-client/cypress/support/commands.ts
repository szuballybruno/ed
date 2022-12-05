/// <reference types="cypress" />

Cypress.Commands.add("printLog", (message) => { cy.task("log", {message}); })

// declare global {
//   namespace Cypress {
//     interface Chainable {
//         printLog(): Chainable;
//     //   login(email: string, password: string): Chainable<void>
//     //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }