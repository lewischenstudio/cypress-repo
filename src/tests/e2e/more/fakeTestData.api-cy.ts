import { faker } from "@faker-js/faker";

it("fake test data", () => {
  const articleTitle = faker.person.fullName();

  cy.loginToObtainToken();

  cy.env(["API_SERVER"]).then(({ API_SERVER }) => {
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        url: `${API_SERVER}/articles/`,
        method: "POST",
        body: {
          article: {
            title: articleTitle,
            description: faker.person.jobTitle(),
            body: faker.lorem.paragraph(10),
            tagList: [],
          },
        },
        headers: { Authorization: "Token " + accessToken },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.article.title).to.equal(articleTitle);
      });
    });
  });

  cy.contains(articleTitle).click();
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.contains("button", "Delete Article").first().click();
  cy.wait("@articleApiCall");
  cy.get("app-article-list").should("not.contain.text", articleTitle);
});
