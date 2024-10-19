Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://0.0.0.0:8080");
  cy.get("#registerForm > div.modal-header > button").click({ force: true });
  cy.wait(1000);
  cy.get('button[data-auth="login"]').eq(0).click({ force: true });
  cy.wait(1000);
  cy.get("input#loginEmail").type(email, { force: true });
  cy.get("input#loginPassword").type(password, { force: true });
  cy.get('#loginForm > div.modal-footer > button[type="submit"]').click({
    force: true,
  });
});
