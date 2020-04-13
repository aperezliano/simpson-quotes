const { Router } = require('express');
const { getRandomQuote, getRandomSimpsonsQuote, getRandomQuoteAndAuthorInformation } = require('../controllers/quotes');
const quotesRouter = Router();

quotesRouter.get('/', getRandomQuote);
quotesRouter.get('/quote-and-info', getRandomQuoteAndAuthorInformation);
quotesRouter.get('/simpsons', getRandomSimpsonsQuote);

module.exports = quotesRouter;
