// Toggle light/dark mode
export function initThemeToggle() {
  const modeToggle = document.querySelector("#modeToggle");
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
}
