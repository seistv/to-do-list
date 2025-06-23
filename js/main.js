import { initCheckboxToggle } from "./checkboxToggle.js";
import { initThemeToggle } from "./themeToggle.js";
import { initEditHandlers } from "./editHandler.js";
import {
  initRowActions,
  initAddRowButton,
  updateMoveButtons,
} from "./rowActions.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoListBody = document.querySelector("#todoListBody");
  const addRowBtn = document.querySelector("#addRowBtn");

  initThemeToggle();
  initCheckboxToggle();
  initEditHandlers(todoListBody);
  initRowActions(todoListBody, () => updateMoveButtons(todoListBody));
  initAddRowButton(addRowBtn, todoListBody, () =>
    updateMoveButtons(todoListBody)
  );
  updateMoveButtons(todoListBody);
});
