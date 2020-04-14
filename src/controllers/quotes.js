const quotesService = require('../services/quotes');
const wikipediaService = require('../services/wikipedia');

module.exports = { getRandomSimpsonsQuote, getRandomSimpsonsQuoteAndCharacterformation };

async function getRandomSimpsonsQuote(_, res, next) {
  try {
    const quote = await quotesService.getRandomSimpsonsQuotes();
    res.send(quote);
  } catch (e) {
    console.log(e);
    next('Internal error');
  }
}

async function getRandomSimpsonsQuoteAndCharacterformation(_, res, next) {
  try {
    const quote = await quotesService.getRandomSimpsonsQuotes();
    const characterArticle = await wikipediaService.getArticle({ title: quote.author });
    const response = { ...quote, ...characterArticle };
    res.send(response);
  } catch (e) {
    console.log(e);
    next('Internal error');
  }
}
