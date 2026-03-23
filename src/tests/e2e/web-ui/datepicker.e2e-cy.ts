it("datepickers", () => {
  cy.contains("Forms").click();
  cy.contains("Datepicker").click({ force: true });

  cy.get('[placeholder="Form Picker"]').then((input) => {
    cy.wrap(input).click();
    cy.get(".day-cell").not(".bounding-month").contains("12").click();
    cy.wrap(input).should("have.value", "Mar 12, 2026");
  });

  function selectDateFromCurrentDay(day: number) {
    const date = new Date();
    date.setDate(date.getDate() + day);
    const futureDay = date.getDate();
    const futureMonthLong = date.toLocaleDateString("en-US", { month: "long" });
    const futureMonthShort = date.toLocaleDateString("en-US", {
      month: "short",
    });
    const futureYear = date.getFullYear().toString();
    const dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`;

    cy.get("nb-calendar-view-mode")
      .invoke("text")
      .then((calendarMonthAndYear) => {
        if (
          !calendarMonthAndYear.includes(futureMonthLong) ||
          !calendarMonthAndYear.includes(futureYear)
        ) {
          cy.get('[data-name="chevron-right"]').click();
          selectDateFromCurrentDay(day);
        } else {
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(futureDay)
            .click();
        }
      });
    return dateToAssert;
  }

  cy.get('[placeholder="Form Picker"]').then((input) => {
    cy.wrap(input).click();
    const dateToAssert = selectDateFromCurrentDay(35);
    cy.wrap(input).should("have.value", dateToAssert);
  });
});
