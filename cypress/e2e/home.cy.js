import { apiPath } from "../../src/js/api";

describe("The user access", () => {
  it("should log in with the login form with valid credentials", () => {
    cy.fixture("validUser").then((user) => {
      cy.intercept("POST", `${apiPath}/social/auth/login`).as("loginAttempt");
      cy.login(user.email, user.password);
      cy.get('button[data-auth="logout"]').should("exist").and("be.visible");

      cy.wait("@loginAttempt").its("response.statusCode").should("eq", 200);
      cy.window().then((window) => {
        expect(window.localStorage.getItem("token")).to.be.not.null;
      });
    });
  });
  it("should not log in with the login form with invalid credentials", () => {
    cy.fixture("invalidUser").then((user) => {
      cy.intercept("POST", `${apiPath}/social/auth/login`).as("loginAttempt");
      cy.login(user.email, user.password);
      cy.on("window:alert", (t) => {
        expect(t).to.contains(
          "Either your username was not found or your password is incorrect",
        );
      });
      cy.wait("@loginAttempt").its("response.statusCode").should("eq", 401);
    });
  });

  it("should log out with the logout button", () => {
    cy.fixture("validUser").then((user) => {
      cy.login(user.email, user.password);
      cy.get('button[data-auth="logout"]')
        .should("exist")
        .and("be.visible")
        .click();
      cy.get("#registerForm > div.modal-header > h5").contains(
        "Create Profile",
      );
      cy.window().then((window) => {
        expect(window.localStorage.getItem("token")).to.be.null;
      });
    });
  });
});
