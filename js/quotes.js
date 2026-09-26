import { LOCAL_QUOTES } from "./data/quotes.js";
import { el } from "./dom.js";

const TOAST_DURATION = 2000;
let toastTimeoutId; // Guarda a referência do timer atual
let lastIndice = null;

function randomQuote() {
  let quote;

  // Repete o sorteio enquanto o índice sorteador for igual ao último
  do {
    quote = Math.floor(Math.random() * LOCAL_QUOTES.length);
  } while (quote === lastIndice);

  lastIndice = quote;

  return LOCAL_QUOTES[quote];
}

export function generateQuote() {
  const quote = randomQuote();

  el.quoteCard.classList.remove("quote-card--fade-in");
  void el.quoteCard.offsetWidth; // Força o reflow
  el.quoteText.innerText = quote.text;
  el.quoteAuthor.innerText = quote.author;
  el.quoteCard.classList.add("quote-card--fade-in");
  el.copyBtn.removeAttribute("disabled");
}

function showToast(message, iconClass, isError = false) {
  clearTimeout(toastTimeoutId);

  el.toast.innerHTML = `<i class="fa-solid ${iconClass} toast__icon" aria-hidden="true"></i> ${message}`;
  el.toast.classList.add("toast--visible");
  el.toast.classList.toggle("toast--error", isError);

  toastTimeoutId = setTimeout(function () {
    el.toast.classList.remove("toast--visible");
  }, TOAST_DURATION);
}

export async function copyQuote() {
  const text = el.quoteText.textContent;
  const author = el.quoteAuthor.textContent;

  try {
    await navigator.clipboard.writeText(`"${text}" - ${author}`);
    el.copyBtn.classList.add("button--copy--success");
    showToast("Frase copiada!", "fa-check");

    setTimeout(function () {
      el.copyBtn.classList.remove("button--copy--success");
    }, TOAST_DURATION);
  } catch (err) {
    showToast("Erro ao tentar copiar!", "fa-triangle-exclamation", true);
  }
}
