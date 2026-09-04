import { el } from "./dom.js";
import { generateQuote } from "./quotes.js";
import { initTheme, toggleTheme } from "./theme.js";

function init() {
  initTheme();

  el.themeToggle.addEventListener("click", toggleTheme);
  el.generateBtn.addEventListener("click", generateQuote);
}

document.addEventListener("DOMContentLoaded", init);
