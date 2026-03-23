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
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });
  return dateToAssert;
}

class DatepickerPage {
  selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number) {
    cy.get('[placeholder="Form Picker"]').then((input) => {
      cy.wrap(input).click();
      const dateToAssert = selectDateFromCurrentDay(numberOfDaysFromToday);
      cy.wrap(input).should("have.value", dateToAssert);
    });
  }

  selectRangePickerDateFromToday(
    numberOfDaysFromTodayStart: number,
    numberOfDaysFromTodayEnd: number,
  ) {
    cy.get('[placeholder="Range Picker"]').then((input) => {
      cy.wrap(input).click();
      const dateToAssertStart = selectDateFromCurrentDay(
        numberOfDaysFromTodayStart,
      );
      const dateToAssertEnd = selectDateFromCurrentDay(
        numberOfDaysFromTodayEnd,
      );
      const finalDate = `${dateToAssertStart} - ${dateToAssertEnd}`;
      cy.wrap(input).should("have.value", finalDate);
    });
  }
}

export const onDatepickerPage = new DatepickerPage();
