it("test tags", { tags: "@smoke" }, () => {
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.uiLogin();
  cy.wait("@articleApiCall").then((apiArticleObject) => {
    expect(apiArticleObject.response?.body.articles[0].title).to.contain(
      "Bondar Academy",
    );
  });
  cy.get("app-article-list")
    .invoke("text")
    .then((allArticleTexts) => {
      expect(allArticleTexts).to.contain("Bondar Academy");
    });
});

it("retry tests", { retries: 2, tags: ["@retry", "@retries"] }, () => {
  cy.intercept("GET", "**/articles*", (req) => {
    req.continue((res) => {
      res.body.articles[0].favoritesCount = 9999999;
      res.send(res.body);
    });
  });
  cy.loginToApplication();
  cy.get("app-favorite-button").first().should("contain.text", "99999999");
});
