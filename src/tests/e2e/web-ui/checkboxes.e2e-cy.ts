it("checkboxes", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Toastr").click();

  cy.get('[type="checkbox"]').check({ force: true });
  cy.get('[type="checkbox"]').should("be.checked");
});
