// Handles editing of task
export function initEditHandlers(todoListBody) {
  todoListBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");

    // If you clicked a button, don't activate edit
    if (
      e.target.closest(".delete-btn") ||
      e.target.closest(".move-up-btn") ||
      e.target.closest(".move-down-btn") ||
      e.target.closest(".completion-checkbox")
    ) {
      return;
    }

    // Edit text: find span and input within the row
    const span = row.querySelector(".editable-text");
    const input = row.querySelector(".editable-input");

    // Activate editing
    span.style.display = "none";
    input.style.display = "inline-block";
    input.value = span.textContent;
    input.focus();
  });

  // Handle blur (save changes)
  todoListBody.addEventListener(
    "blur",
    (e) => {
      if (!e.target.classList.contains("editable-input")) return;

      const input = e.target;
      const span = input.previousElementSibling;
      span.textContent = input.value;
      span.style.display = "inline-block";
      input.style.display = "none";
    },
    true
  );

  // Handle Enter key
  todoListBody.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("editable-input") && e.key === "Enter") {
      e.target.blur();
    }
  });
}
