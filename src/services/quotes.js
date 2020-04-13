const { fetch } = require('./_base');

module.exports = { getRandomQuote, getRandomSimpsonsQuotes };

async function getRandomQuote() {
  const quote = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  return getQuoteResponse({ quote: quote.quoteText, author: quote.quoteAuthor });
}

async function getRandomSimpsonsQuotes({ number = 1 } = { number: 1 }) {
  const quotes = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${number}`);
  const quote = quotes[0];
  return getQuoteResponse({ quote: quote.quote, author: quote.character });
}

function getQuoteResponse({ quote, author }) {
  return {
    quote,
    author,
  };
}
