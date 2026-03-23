it("first test", () => {
  // Wild card for https://conduit-api.bondaracademy.com/api
  cy.intercept("GET", "**/tags", {
    fixture: "tags.json",
  });
  cy.intercept("GET", "**/articles?limit=10&offset=0", {
    fixture: "articles.json",
  });
  cy.loginToApplication();
});
