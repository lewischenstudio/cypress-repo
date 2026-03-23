it("Cypress Locator Methods", () => {
  //Theory
  //get() - to find elements on the page globally
  //find() - to find only child elements
  //contains() - to find web elements by text

  cy.contains("Sign in");
  cy.contains('[status="warning"]', "Sign in");
  cy.contains("nb-card", "Horizontal form").find("button");
  cy.contains("nb-card", "Horizontal form").contains("Sign in");
  cy.contains("nb-card", "Horizontal form").get("button");
});
