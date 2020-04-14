const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../src/app');
const request = require('supertest');

const quotesService = require('../../src/services/quotes');
const wikipediaService = require('../../src/services/wikipedia');

describe('Quotes Controller', function () {
  describe('200 cases', function () {
    let getRandomSimpsonsQuotesStub;
    let getArticleStub;

    beforeEach(function () {
      getRandomSimpsonsQuotesStub = sinon
        .stub(quotesService, 'getRandomSimpsonsQuotes')
        .returns(Promise.resolve(getExampleQuotes()));
      getArticleStub = sinon.stub(wikipediaService, 'getArticle').returns(Promise.resolve(getExampleArticle()));
    });

    afterEach(function () {
      getRandomSimpsonsQuotesStub.restore();
      getArticleStub.restore();
    });

    describe('GET random Simpsons quote', function () {
      it('Should return a quote, status 200', async function () {
        const response = await request(app).get('/quotes/simpsons').expect(200);
        checkQuoteResponseBody(response.body);
        expect(getRandomSimpsonsQuotesStub.calledOnce).to.be.true;
      });
    });

    describe('GET random quote & author info', function () {
      it('Should return a quote, the author info, status 200', async function () {
        const response = await request(app).get('/quotes/quote-and-info').expect(200);
        checkWikiResponseBody(response.body);
        expect(getRandomSimpsonsQuotesStub.calledOnce).to.be.true;
        expect(getArticleStub.calledOnce).to.be.true;
      });
    });
  });

  describe('500 cases', function () {
    let getArticleStub;
    let getRandomSimpsonsQuotesStub;

    beforeEach(function () {
      getRandomSimpsonsQuotesStub = sinon.stub(quotesService, 'getRandomSimpsonsQuotes').throws('Error');
      getArticleStub = sinon.stub(wikipediaService, 'getArticle').throws('Error');
    });

    afterEach(function () {
      getRandomSimpsonsQuotesStub.restore();
      getArticleStub.restore();
    });

    describe('GET random Simpsons quote', function () {
      it('Should return a 500 error', async function () {
        await request(app).get('/quotes/simpsons').expect(500);
      });
    });

    describe('GET random quote & author info', function () {
      it('Should return a 500 error', async function () {
        await request(app).get('/quotes/quote-and-info').expect(500);
      });
    });
  });
});

function checkQuoteResponseBody(responseBody) {
  const exampleQuote = getExampleQuotes()[0];

  expect(responseBody).to.have.all.keys('quote', 'character', 'image');
  expect(responseBody).to.deep.include(exampleQuote);
}

function checkWikiResponseBody(responseBody) {
  const exampleArticle = getExampleArticle();
  const exampleQuote = getExampleQuotes()[0];

  expect(responseBody).to.have.all.keys('quote', 'character', 'text', 'images');
  expect(responseBody).not.to.have.any.keys('image');
  expect(responseBody).to.deep.include({
    quote: exampleQuote.quote,
    character: exampleQuote.character,
    text: exampleArticle.text,
    images: [exampleQuote.image, ...exampleArticle.images],
  });
}

function getExampleQuotes() {
  return [
    {
      quote: 'quote',
      character: 'character',
      image: 'image',
    },
  ];
}

function getExampleArticle() {
  return { text: 'text', images: ['wiki-image'] };
}
