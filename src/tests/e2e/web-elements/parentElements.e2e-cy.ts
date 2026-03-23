it("Parent Elements", () => {
  cy.get("#inputEmail1").parents("form").find("button");

  cy.contains("Using the Grid").parent().find("button");

  cy.get("#inputEmail1").parentsUntil("nb-card-body").find("button");
});
