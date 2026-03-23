it("Extracting Values", () => {
  // 1. using a JQuery method
  cy.get('[for="exampleInputEmail1"]').then((label) => {
    const emailLabel = label.text();
    console.log(emailLabel);
  });

  // 2. Using invoke command
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((emailLabel) => {
      console.log(emailLabel);
    });
  cy.get('[for="exampleInputEmail1"]').invoke("text").as("emailLabel");
  cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

  // 3. Invoke attribute value
  cy.get("#exampleInputEmail1")
    .invoke("attr", "class")
    .then((classValue) => {
      console.log(classValue);
    });
  cy.get("#exampleInputEmail1").should(
    "have.attr",
    "class",
    "input-full-width size-medium status-basic shape-rectangle nb-transition",
  );

  // 4. Invoke input field value
  cy.get("#exampleInputEmail1").type("hello@test.com");
  cy.get("#exampleInputEmail1")
    .invoke("prop", "value")
    .then((value) => {
      console.log(value);
    });
});
