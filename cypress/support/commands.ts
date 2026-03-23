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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-iframe";

Cypress.Commands.add("openBaseURL", () => {
  cy.visit("/");
});

Cypress.Commands.add("loginToApplication", () => {
  cy.env(["LOGIN_URL", "LOGIN_EMAIL", "LOGIN_PASSWORD"]).then(
    ({ LOGIN_URL, LOGIN_EMAIL, LOGIN_PASSWORD }) => {
      cy.visit(LOGIN_URL);
      cy.contains("Sign in").click();
      cy.get('[placeholder="Email"]').type(LOGIN_EMAIL);
      cy.get('[placeholder="Password"]').type(LOGIN_PASSWORD);
      cy.contains("button", "Sign in").click();
    },
  );
});

Cypress.Commands.add("loginToObtainToken", () => {
  cy.env(["API_SERVER", "HOME_URL", "LOGIN_EMAIL", "LOGIN_PASSWORD"]).then(
    ({ API_SERVER, HOME_URL, LOGIN_EMAIL, LOGIN_PASSWORD }) => {
      cy.request({
        url: `${API_SERVER}/users/login`,
        method: "POST",
        body: {
          user: {
            email: LOGIN_EMAIL,
            password: LOGIN_PASSWORD,
          },
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        const accessToken = response.body.user.token;
        cy.wrap(accessToken).as("accessToken");
        cy.visit(HOME_URL, {
          onBeforeLoad(win) {
            win.localStorage.setItem("jwtToken", accessToken);
          },
        });
      });
    },
  );
});

// https://docs.cypress.io/api/commands/session
Cypress.Commands.add("uiLogin", () => {
  cy.env(["LOGIN_URL", "LOGIN_EMAIL", "LOGIN_PASSWORD", "HOME_URL"]).then(
    ({ LOGIN_URL, LOGIN_EMAIL, LOGIN_PASSWORD, HOME_URL }) => {
      cy.session(
        "user",
        () => {
          cy.visit(LOGIN_URL);
          cy.contains("Sign in").click();
          cy.get('[placeholder="Email"]').type(LOGIN_EMAIL);
          cy.get('[placeholder="Password"]').type(LOGIN_PASSWORD);
          cy.contains("button", "Sign in").click();
          cy.location("pathname").should("eq", "/");
        },
        {
          cacheAcrossSpecs: true, // cached the user state across all tests
        },
      );
      cy.visit(HOME_URL);
    },
  );
});
