const THEME_KEY = "sentence-generator-theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const colorSchemeMedia = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  const systemPrefersDark = colorSchemeMedia ? colorSchemeMedia.matches : false;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(theme);

  if (!savedTheme && colorSchemeMedia) {
    colorSchemeMedia.addEventListener("change", (event) => {
      const newTheme = event.matches ? "dark" : "light";
      applyTheme(newTheme);
    });
  }
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
