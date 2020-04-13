const fetch = require('node-fetch');

module.exports = { getRandomQuote, getRandomSimpsonsQuote };

async function getRandomQuote() {
  try {
    const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
    const quote = await response.json();
    return getQuoteResponse({ quote: quote.quoteText, author: quote.quoteAuthor });
  } catch (e) {
    console.log(e);
  }
}

async function getRandomSimpsonsQuote() {
  try {
    const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
    const quotes = await response.json();
    const quote = quotes[0];
    return getQuoteResponse({ quote: quote.quote, author: quote.character });
  } catch (e) {
    console.log(e);
  }
}

function getQuoteResponse({ quote, author }) {
  return {
    quote,
    author,
  };
}
