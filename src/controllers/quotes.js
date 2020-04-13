const quotesService = require('../services/quotes');

async function getRandomQuote(req, res) {
  const quote = await quotesService.getRandomQuote();
  res.send(quote);
}

async function getRandomSimpsonsQuote(req, res) {
  const quote = await quotesService.getRandomSimpsonsQuote();
  res.send(quote);
}

module.exports = { getRandomQuote, getRandomSimpsonsQuote };
