const { Router } = require('express');
const { getRandomSimpsonsQuote, getRandomSimpsonsQuoteAndCharacterformation } = require('../controllers/quotes');
const quotesRouter = Router();

quotesRouter.get('/quote-and-info', getRandomSimpsonsQuoteAndCharacterformation);
quotesRouter.get('/simpsons', getRandomSimpsonsQuote);

module.exports = quotesRouter;
