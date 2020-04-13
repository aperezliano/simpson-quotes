const quotesService = require('../services/quotes');
const wikipediaService = require('../services/wikipedia');

async function getRandomQuote(_, res, next) {
  try {
    const quote = await quotesService.getRandomQuote();
    res.send(quote);
  } catch (e) {
    next(e);
  }
}

async function getRandomSimpsonsQuote(_, res, next) {
  try {
    const quote = await quotesService.getRandomSimpsonsQuote();
    res.send(quote);
  } catch (e) {
    next(e);
  }
}

async function getRandomQuoteAndAuthorInformation(_, res, next) {
  try {
    const quote = await quotesService.getRandomQuote();
    const authorArticle = await wikipediaService.getArticle({ title: quote.author });
    res.send({ ...quote, ...authorArticle });
  } catch (e) {
    next(e);
  }
}

module.exports = { getRandomQuote, getRandomSimpsonsQuote, getRandomQuoteAndAuthorInformation };
