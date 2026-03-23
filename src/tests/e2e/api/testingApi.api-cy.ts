it("delete article", () => {
  const articleTitle = "Test title Cypress";

  cy.env(["API_SERVER", "LOGIN_EMAIL", "LOGIN_PASSWORD"]).then(
    ({ API_SERVER, LOGIN_EMAIL, LOGIN_PASSWORD }) => {
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
        const accessToken = "Token " + response.body.user.token;

        // Attempt to delete the article if it already exists.
        // Retrieve articles and delete the article created in the above step
        cy.request({
          url: `${API_SERVER}/articles?limit=10&offset=0`,
          method: "GET",
          headers: { Authorization: accessToken },
        }).then((response) => {
          expect(response.status).to.equal(200);
          const articles = response.body.articles;
          const thisArticleIndex = articles.findIndex(
            (article: { title: string }) =>
              article.title.includes(articleTitle),
          );
          if (thisArticleIndex >= 0) {
            const slugID = articles[thisArticleIndex].slug;
            cy.request({
              url: `${API_SERVER}/articles/${slugID}`,
              method: "DELETE",
              headers: { Authorization: accessToken },
            }).then((response) => {
              expect(response.status).to.equal(204);
            });
          }
        });

        cy.request({
          url: `${API_SERVER}/articles/`,
          method: "POST",
          body: {
            article: {
              title: articleTitle,
              description: "Some description",
              body: "This is a body",
              tagList: [],
            },
          },
          headers: { Authorization: accessToken },
        }).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body.article.title).to.equal(articleTitle);
        });
      });
    },
  );

  cy.loginToApplication();
  cy.contains(articleTitle).click();
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.contains("button", "Delete Article").first().click();
  cy.wait("@articleApiCall");
  cy.get("app-article-list").should("not.contain.text", articleTitle);
});
