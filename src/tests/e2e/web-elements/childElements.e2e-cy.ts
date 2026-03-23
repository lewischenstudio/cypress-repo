it("Child Elements", () => {
  cy.contains("nb-card-header", "Using the Grid")
    .find(".row")
    .should("not.exist");

  cy.get("nb-card").find("nb-radio-group").contains("Option 1");

  cy.get("nb-card nb-radio-group").contains("Option 1");

  cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]');
});
