const { Router } = require('express');
const { getRandomQuote, getRandomSimpsonsQuote } = require('../controllers/quotes');
const quotesRouter = Router();

quotesRouter.get('/', getRandomQuote);
quotesRouter.get('/simpsons', getRandomSimpsonsQuote);
quotesRouter.get('/:author/info', getRandomSimpsonsQuote);

module.exports = quotesRouter;
