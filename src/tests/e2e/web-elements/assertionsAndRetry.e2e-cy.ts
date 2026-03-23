// https://docs.cypress.io/app/references/assertions
it("Assertions", () => {
  cy.get('[for="exampleInputEmail1"]').should("have.text", "Email address");

  cy.get('[for="exampleInputEmail1"]').then((label) => {
    expect(label).to.have.text("Email address");
  });

  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((emailLabel) => {
      expect(emailLabel).to.equal("Email address");
      cy.wrap(emailLabel).should("equal", "Email address");
    });
});
