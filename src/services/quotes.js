const fetch = require('node-fetch');

module.exports = { getRandomQuote, getRandomSimpsonsQuote };

async function getRandomQuote() {
  const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
  const quote = await response.json();
  return getQuoteResponse({ quote: quote.quoteText, author: quote.quoteAuthor });
}

async function getRandomSimpsonsQuote() {
  const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
  const quotes = await response.json();
  const quote = quotes[0];
  return getQuoteResponse({ quote: quote.quote, author: quote.character });
}

function getQuoteResponse({ quote, author }) {
  return {
    quote,
    author,
  };
}
