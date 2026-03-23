it("tooltips", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Tooltip").click();

  cy.contains("button", "Top").trigger("mouseenter");
  cy.get("nb-tooltip").should("have.text", "This is a tooltip");
});
