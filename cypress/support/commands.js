// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { 
//   // Implement login logic here
// })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => { 
//   // Implement drag logic here
// })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional' }, (subject, options) => { 
//   // Implement dismiss logic here
// })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { 
//   // Implement visit logic here
// })

// Custom command to get an iframe and wrap its body
Cypress.Commands.add('getIframe', (iframeSelector) => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body')
      .should('be.visible')
      .then(cy.wrap);
  });
  