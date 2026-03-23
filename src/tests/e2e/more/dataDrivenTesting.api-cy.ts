const testData = [
  {
    username: "12",
    errorMessage: "username is too short (minimum is 3 characters)",
    errorIsDisplayed: true,
  },
  {
    username: "123",
    errorMessage: "username",
    errorIsDisplayed: false,
  },
  {
    username: "12345678901234567890",
    errorMessage: "username",
    errorIsDisplayed: false,
  },
  {
    username: "12345678901234567890123456789012345678901",
    errorMessage: "username is too long (maximum is 20 characters)",
    errorIsDisplayed: true,
  },
];

testData.forEach((data) => {
  it(`data driven test: ${data.username}`, () => {
    cy.env(["HOME_URL"]).then(({ HOME_URL }) => {
      cy.visit(HOME_URL);
      cy.contains("Sign up").click();
      cy.get('[placeholder="Username"').type(data.username);
      cy.get('[placeholder="Email"').type("12");
      cy.get('[placeholder="Password"').type("12");
      cy.contains("button", "Sign up").click();
      if (data.errorIsDisplayed) {
        cy.get(".error-messages").should("contain.text", data.errorMessage);
      }
    });
  });
});
