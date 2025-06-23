// Toggle checkbox if task is done or not
export function initCheckboxToggle() {
  const selectAll = document.querySelector("#selectAll");
  const todoListBody = document.getElementById("todoListBody");

  // Select All Checkbox
  selectAll.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".row-checkbox");
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

    // Ensure it's a task checkbox, not the "selectAll"
    if (
      checkbox.matches(".completion-checkbox") &&
      checkbox.id !== "selectAll"
    ) {
      checkbox
        .closest("tr")
        .querySelector(".editable-text")
        ?.classList.toggle("completed", checkbox.checked);

      // Update "select all" checkbox state
      const checkboxes = document.querySelectorAll(".row-checkbox");
      selectAll.checked = Array.from(checkboxes).every((cb) => cb.checked);
    }
  });
}
