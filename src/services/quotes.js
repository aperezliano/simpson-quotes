const _base = require('./_base');

module.exports = { getRandomSimpsonsQuotes };

async function getRandomSimpsonsQuotes(amount = 1) {
  const response = await _base.fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${amount}`);
  const quotes = await response.json();
  return quotes.map(({ character, image, quote }) => ({ character, image, quote }));
}
