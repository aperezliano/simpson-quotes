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
    const { character, quote, image: mainImage } = quotes[0] || {};
    const { text: wiki, images } = await wikipediaService.getArticleByTitle(character);

    const response = {
      quote,
      character,
      wiki,
      mainImage,
      images,
    };
    res.send(response);
  } catch (e) {
    next(e.message);
  }
}
