const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../src/app');
const request = require('supertest');

const quotesService = require('../../src/services/quotes');
const wikipediaService = require('../../src/services/wikipedia');

describe('Quotes Controller', function () {
  let getRandomSimpsonsQuotesStub;
  let getArticleStub;

  beforeEach(function () {
    getRandomSimpsonsQuotesStub = sinon.stub(quotesService, 'getRandomSimpsonsQuotes');
    getArticleStub = sinon.stub(wikipediaService, 'getArticleByTitle');
  });

  afterEach(function () {
    getRandomSimpsonsQuotesStub.restore();
    getArticleStub.restore();
  });

  describe('200 cases', function () {
    beforeEach(function () {
      getRandomSimpsonsQuotesStub.returns(Promise.resolve(getExampleQuotes()));
      getArticleStub.returns(Promise.resolve(getExampleArticle()));
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
    beforeEach(function () {
      getRandomSimpsonsQuotesStub.throws('Error', 'Controlled Error');
      getArticleStub.throws('Error', 'Controlled Error');
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
  const { text, images } = getExampleArticle();
  const { quote, character, image } = getExampleQuotes()[0];

  expect(responseBody).to.have.all.keys('quote', 'character', 'wiki', 'images', 'mainImage');
  expect(responseBody).to.deep.include({
    quote: quote,
    character: character,
    wiki: text,
    mainImage: image,
    images: images,
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
