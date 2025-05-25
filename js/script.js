document.addEventListener("DOMContentLoaded", updateMoveButtons);

// Toggle light/dark mode
const modeToggle = document.getElementById("modeToggle");
const body = document.body;
const savedMode = localStorage.getItem("theme");

if (savedMode) {
  body.classList.remove("light-mode", "dark-mode");
  body.classList.add(savedMode);
  modeToggle.textContent = savedMode === "dark-mode" ? "☀️" : "🌙";
}

modeToggle.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  const newMode = isDark ? "light-mode" : "dark-mode";
  localStorage.setItem("theme", newMode);
  modeToggle.textContent = isDark ? "🌙" : "☀️";
});

// Handle moving up/down
const todoListBody = document.getElementById("todoListBody");
todoListBody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");

  // If you clicked a button, don't activate edit
  if (
    e.target.closest(".delete-btn") ||
    e.target.closest(".move-up-btn") ||
    e.target.closest(".move-down-btn")
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

// Handle button actions (delete, move)
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

// Handle add button
const addRowBtn = document.getElementById("addRowBtn");
addRowBtn.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>
      <div class="editable-container">
        <span class="editable-text">Click to edit...</span>
        <input type="text" maxlength="70" class="editable-input">
      </div>
    </td>
    <td class="text-end actions-column">
      <button class="btn btn-sm btn-secondary move-up-btn" title="Move Up"><i class="bi bi-arrow-up"></i></button>
      <button class="btn btn-sm btn-secondary move-down-btn" title="Move Down"><i class="bi bi-arrow-down"></i></button>
      <button class="btn btn-sm btn-danger delete-btn" title="Delete"><i class="bi bi-trash"></i></button>
    </td>
  `;

  todoListBody.appendChild(newRow);
  updateMoveButtons();
});

// Updates the arrow buttons
function updateMoveButtons() {
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
