import { el } from "./dom.js";
import { initTheme, toggleTheme } from "./theme.js";

function init() {
  initTheme();

  el.themeToggle.addEventListener("click", toggleTheme);
}

document.addEventListener("DOMContentLoaded", init);
