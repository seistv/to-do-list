// Toggle checkbox if task is done or not
export function initCheckboxToggle() {
  const selectAll = document.querySelector("#selectAll");
  const todoListBody = document.getElementById("todoListBody");

  const getCheckboxes = () => document.querySelectorAll(".row-checkbox");

  const updateSelectAllState = () => {
    const checkboxes = getCheckboxes();
    const allChecked = [...checkboxes].every((cb) => cb.checked);
    const noneChecked = [...checkboxes].every((cb) => !cb.checked);

    selectAll.checked = allChecked;
    selectAll.indeterminate = !allChecked && !noneChecked;
    selectAll.classList.toggle("indeterminate", selectAll.indeterminate);
  };

  // Select All Checkbox
  selectAll.addEventListener("click", () => {
    selectAll.indeterminate = false;
    selectAll.classList.remove("indeterminate");

    const checkboxes = getCheckboxes();
    checkboxes.forEach((cb) => {
      cb.checked = selectAll.checked;
      cb.closest("tr")
        .querySelector(".editable-text")
        ?.classList.toggle("completed", cb.checked);
    });
  });

  // Handle individual checkbox toggles
  todoListBody.addEventListener("click", (e) => {
    const checkbox = e.target;

    if (
      checkbox.matches(".completion-checkbox") &&
      checkbox.id !== "selectAll"
    ) {
      checkbox
        .closest("tr")
        .querySelector(".editable-text")
        ?.classList.toggle("completed", checkbox.checked);

      updateSelectAllState();
    }
  });
}
