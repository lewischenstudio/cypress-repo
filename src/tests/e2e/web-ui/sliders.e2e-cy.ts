it("sliders", () => {
  cy.visit("https://playground.bondaracademy.com/pages/iot-dashboard");
  cy.get('[tabtitle="Temperature"] circle')
    .invoke("attr", "cx", "38.66")
    .invoke("attr", "cy", "57.75")
    .click();
  cy.get('[class="value temperature h1"]').should("contain.text", "18");
});
