it("dialog boxes", () => {
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  //1.
  cy.get(".nb-trash").first().click();
  cy.on("window:confirm", (confirm) => {
    expect(confirm).to.equal("Are you sure you want to delete?");
  });

  //2.
  cy.window().then((win) => {
    cy.stub(win, "confirm").as("dialogBox").returns(false);
  });
  cy.get(".nb-trash").first().click();
  cy.get("@dialogBox").should(
    "be.calledWith",
    "Are you sure you want to delete?",
  );
});
