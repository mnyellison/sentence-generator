import { LOCAL_QUOTES } from "./data/quotes.js";
import { el } from "./dom.js";

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

export async function copyQuote() {
  const text = el.quoteText.textContent;
  const author = el.quoteAuthor.textContent;

  try {
    await navigator.clipboard.writeText(`"${text}" - ${author}`);
    el.copyBtn.classList.add("button--copy--success");
    el.toast.classList.add("toast--visible");

    setTimeout(function () {
      el.copyBtn.classList.remove("button--copy--success");
      el.toast.classList.remove("toast--visible");
    }, 2000);
  } catch (err) {
    console.error("Falha ao copiar o texto: ", err);
  }
}
