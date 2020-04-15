const quotesService = require('../services/quotes');
const wikipediaService = require('../services/wikipedia');

module.exports = { getRandomSimpsonsQuote, getRandomSimpsonsQuoteAndCharacterformation };

async function getRandomSimpsonsQuote(_, res, next) {
  try {
    const quotes = await quotesService.getRandomSimpsonsQuotes(1);
    const quote = quotes[0];
    res.send(quote);
  } catch (e) {
    next(e.message);
  }
}

async function getRandomSimpsonsQuoteAndCharacterformation(_, res, next) {
  try {
    const quotes = await quotesService.getRandomSimpsonsQuotes(1);
    const quote = quotes[0];
    const characterArticle = await wikipediaService.getArticleByTitle(quote.character);

    const response = {
      quote: quote.quote,
      character: quote.character,
      wiki: characterArticle.text,
      images: [quote.image, ...characterArticle.images],
    };
    res.send(response);
  } catch (e) {
    next(e.message);
  }
}
