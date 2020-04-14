const { fetch } = require('./_base');

module.exports = { getRandomSimpsonsQuotes };

async function getRandomSimpsonsQuotes({ number = 1 } = { number: 1 }) {
  const quotes = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${number}`);
  const quote = quotes[0];
  return { quote: quote.quote, author: quote.character };
}
