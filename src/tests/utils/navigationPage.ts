// Conditional object function
function selectGroupMenuItem(groupItemName: string) {
  cy.contains("a", groupItemName)
    .invoke("attr", "aria-expanded")
    .then((attr) => {
      if (attr?.includes("false")) {
        cy.contains("a", groupItemName).click();
      }
    });
}

class NavigationPage {
  // Go to Forms page
  formLayoutsPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click({ force: true });
  }

  // Go to Datepicker page
  datePickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click();
  }

  // Go to Toastr page
  toastrPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  // Go to Tooltip page
  tooltipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }
}

export const navigateTo = new NavigationPage();
