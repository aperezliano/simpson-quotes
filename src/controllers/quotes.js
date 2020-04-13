const quotesService = require('../services/quotes');
const wikipediaService = require('../services/wikipedia');

module.exports = { getRandomQuote, getRandomSimpsonsQuote, getRandomQuoteAndAuthorInformation };

async function getRandomQuote(_, res, next) {
  const quote = await getServiceCallResult({ serviceCallback: quotesService.getRandomQuote });
  handleResponse({ response: quote, res, next });
}

async function getRandomSimpsonsQuote(_, res, next) {
  const quote = await getServiceCallResult({ serviceCallback: quotesService.getRandomSimpsonsQuotes });
  handleResponse({ response: quote, res, next });
}

async function getRandomQuoteAndAuthorInformation(_, res, next) {
  const quote = await getServiceCallResult({
    serviceCallback: quotesService.getRandomQuote,
  });

  const authorArticle = await getServiceCallResult({
    serviceCallback: wikipediaService.getArticle,
    serviceParams: { title: quote.author },
  });

  handleResponse({ response: { ...quote, ...authorArticle }, res, next });
}

/***********/

async function getServiceCallResult({ serviceCallback, serviceParams }) {
  let retries = 10;
  let quote;
  do {
    try {
      quote = await serviceCallback(serviceParams);
    } catch (e) {
      console.log(e);
    }
    retries--;
  } while (!quote && retries > 0);
  return quote;
}

function handleResponse({ response, res, next }) {
  if (response) {
    res.send(response);
  } else {
    next('Internal error');
  }
}
