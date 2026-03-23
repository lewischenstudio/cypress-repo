it("lists and dropdowns", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Toastr").click();

  cy.contains("div", "Toast type:")
    .find("select")
    .select("info")
    .should("have.value", "info");

  cy.contains("div", "Position:").find("nb-select").click();
  cy.get(".option-list").contains("bottom-right").click();
  cy.contains("div", "Position:")
    .find("nb-select")
    .should("have.text", "bottom-right");

  cy.contains("div", "Position:")
    .find("nb-select")
    .then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".option-list nb-option").each((option, index, list) => {
        cy.wrap(option).click();
        if (index < list.length - 1) cy.wrap(dropdown).click();
      });
    });
});
