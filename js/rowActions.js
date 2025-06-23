// Handle button actions (delete, move)
export function initRowActions(todoListBody, updateMoveButtons) {
  todoListBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");

    if (e.target.closest(".delete-btn")) {
      row.remove();
      updateMoveButtons();
    } else if (e.target.closest(".move-up-btn")) {
      const prev = row.previousElementSibling;
      if (prev) row.parentNode.insertBefore(row, prev);
      updateMoveButtons();
    } else if (e.target.closest(".move-down-btn")) {
      const next = row.nextElementSibling;
      if (next) row.parentNode.insertBefore(next, row);
      updateMoveButtons();
    }
  });
}

// Handle add button
export function initAddRowButton(addRowBtn, todoListBody, updateMoveButtons) {
  addRowBtn.addEventListener("click", () => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="text-start" colspan="2">
        <div class="d-flex align-items-center">
          <input type="checkbox" class="completion-checkbox row-checkbox">
          <div class="editable-container d-flex flex-column">
            <span class="editable-text">CLICK TO EDIT...</span>
            <input type="text" maxlength="70" class="editable-input">
          </div>
        </div>
      </td>
      <td class="text-end actions-column">
        <button class="btn btn-sm btn-secondary move-up-btn" title="Move Up"><i
            class="bi bi-arrow-up"></i></button>
        <button class="btn btn-sm btn-secondary move-down-btn" title="Move Down"><i
            class="bi bi-arrow-down"></i></button>
        <button class="btn btn-sm btn-danger delete-btn" title="Delete"><i class="bi bi-trash"></i></button>
      </td>
    `;

    todoListBody.appendChild(newRow);
    updateMoveButtons();
  });
}

// Updates the arrow buttons
export function updateMoveButtons(todoListBody) {
  const rows = todoListBody.querySelectorAll("tr");

  rows.forEach((row, index) => {
    const upBtn = row.querySelector(".move-up-btn");
    const downBtn = row.querySelector(".move-down-btn");

    if (upBtn) upBtn.style.visibility = index === 0 ? "hidden" : "visible";
    if (downBtn)
      downBtn.style.visibility =
        index === rows.length - 1 ? "hidden" : "visible";
  });
}
