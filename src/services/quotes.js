const { fetch } = require('./_base');

module.exports = { getRandomSimpsonsQuotes };

async function getRandomSimpsonsQuotes({ amount = 1 } = { amount: 1 }) {
  const quotes = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${amount}`);
  return quotes.map(({ character, image, quote }) => ({ character, image, quote }));
}
