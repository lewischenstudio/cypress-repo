// Info: https://docs.cypress.io/app/guides/authentication-testing/okta-authentication

it("delete article", () => {
  cy.loginToObtainToken();

  cy.env(["API_SERVER"]).then(({ API_SERVER }) => {
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        url: `${API_SERVER}/articles/`,
        method: "POST",
        body: {
          article: {
            title: "Test title Cypress",
            description: "Some description",
            body: "This is a body",
            tagList: [],
          },
        },
        headers: { Authorization: "Token " + accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal("Test title Cypress");
      });
    });
  });

  cy.contains("Test title Cypress").click();
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.contains("button", "Delete Article").first().click();
  cy.wait("@articleApiCall");
  cy.get("app-article-list").should("not.contain.text", "Test title Cypress");
});
