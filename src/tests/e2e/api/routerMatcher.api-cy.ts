it("first test", () => {
  // Router Matcher
  // https://docs.cypress.io/api/commands/intercept#Matching-with-RouteMatcher
  cy.intercept({ method: "GET", pathname: "tags" }, { fixture: "tags.json" });
  cy.intercept("GET", "**/articles*", { fixture: "articles.json" });
  cy.loginToApplication();
});
