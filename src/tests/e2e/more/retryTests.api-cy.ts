// Retry two more times before it stops.
// This test is a fail test to show the concept of retry.
it("retry tests", { retries: 2 }, () => {
  cy.intercept("GET", "**/articles*", (req) => {
    req.continue((res) => {
      res.body.articles[0].favoritesCount = 9999999;
      res.send(res.body);
    });
  });
  cy.loginToApplication();
  cy.get("app-favorite-button").first().should("contain.text", "99999999");
});
