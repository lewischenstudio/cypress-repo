it("waiting for apis", () => {
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.loginToApplication();
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
