it("Cypress Chains", () => {
  cy.get("#inputEmail1").parents("form").find("button").click();

  cy.get("#inputEmail1")
    .parents("form")
    .find("nb-radio")
    .first()
    .should("have.text", "Option 1");
});
