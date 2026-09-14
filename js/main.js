import { el } from "./dom.js";
import { generateQuote, copyQuote } from "./quotes.js";
import { initTheme, toggleTheme } from "./theme.js";

function init() {
  initTheme();

  el.themeToggle.addEventListener("click", toggleTheme);
  el.generateBtn.addEventListener("click", generateQuote);
  el.copyBtn.addEventListener("click", copyQuote);
}

document.addEventListener("DOMContentLoaded", init);
