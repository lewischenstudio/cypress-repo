it("Timeouts", () => {
  cy.contains("Modal & Overlays").click();
  cy.contains("Dialog").click();

  cy.contains("Open with delay 10 seconds").click();
  cy.get("nb-dialog-container nb-card-header", { timeout: 11000 }).should(
    "have.text",
    "Friendly reminder",
  );
});
