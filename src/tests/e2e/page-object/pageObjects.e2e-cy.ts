import { onDatepickerPage } from "../../utils/datepickerPage";
import { onFormLayoutsPage } from "../../utils/formLayoutsPage";
import { navigateTo } from "../../utils/navigationPage";

it("navigation test", () => {
  navigateTo.formLayoutsPage();
  navigateTo.datePickerPage();
  navigateTo.tooltipPage();
  navigateTo.toastrPage();
});

it("test with page object", () => {
  navigateTo.formLayoutsPage();
  onFormLayoutsPage.submitUsingTheGridForm("test@test.com", "Welcome", 1);
  onFormLayoutsPage.submitBasicForm("artem@test.com", "Welcome", false);
  navigateTo.datePickerPage();
  onDatepickerPage.selectCommonDatepickerDateFromToday(5);
  onDatepickerPage.selectRangePickerDateFromToday(10, 50);
});
