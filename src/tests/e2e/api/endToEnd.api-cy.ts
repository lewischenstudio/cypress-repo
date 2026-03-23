it("api testing", () => {
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

        // Create new article and verify the new article is created
        cy.request({
          url: `${API_SERVER}/articles/`,
          method: "POST",
          body: {
            article: {
              title: "Test title Cypress API Testing",
              description: "Some description",
              body: "This is a body",
              tagList: [],
            },
          },
          headers: { Authorization: accessToken },
        }).then((response) => {
          expect(response.status).to.equal(201);
          expect(response.body.article.title).to.equal(
            "Test title Cypress API Testing",
          );
        });

        // Retrieve articles and delete the article created in the above step
        cy.request({
          url: `${API_SERVER}/articles?limit=10&offset=0`,
          method: "GET",
          headers: { Authorization: accessToken },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.articles[0].title).to.equal(
            "Test title Cypress API Testing",
          );
          const slugID = response.body.articles[0].slug;

          cy.request({
            url: `${API_SERVER}/articles/${slugID}`,
            method: "DELETE",
            headers: { Authorization: accessToken },
          }).then((response) => {
            expect(response.status).to.equal(204);
          });
        });

        // Retrieve articles and verify the article is no longer available.
        cy.request({
          url: `${API_SERVER}/articles?limit=10&offset=0`,
          method: "GET",
          headers: { Authorization: accessToken },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.articles[0].title).to.not.equal(
            "Test title Cypress API Testing",
          );
        });
      });
    },
  );
});
