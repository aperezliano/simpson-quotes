const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

describe('Integration tests ', function () {
  this.timeout(5000);

  describe('GET random Simpsons quote', () => {
    it('Should return a quote, status 200', async () => {
      const response = await request(app).get('/quotes/simpsons').expect(200);
      checkQuoteResponseBody(response.body);
    });
  });

  describe('GET random quote & author info', () => {
    it('Should return a quote, the author info, status 200', async () => {
      const response = await request(app).get('/quotes/quote-and-info').expect(200);
      checkWikiResponseBody(response.body);
    });
  });
});

function checkQuoteResponseBody(responseBody) {
  expect(responseBody).to.have.all.keys('quote', 'character', 'image');
  expect(responseBody.quote).not.to.be.empty;
  expect(responseBody.character).not.to.be.empty;
  expect(responseBody.image).not.to.be.empty;
}

function checkWikiResponseBody(responseBody) {
  expect(responseBody).to.have.all.keys('wiki', 'images', 'quote', 'character', 'mainImage');
  expect(responseBody.quote).not.to.be.empty;
  expect(responseBody.character).not.to.be.empty;
  expect(responseBody.wiki).not.to.be.empty;
  expect(responseBody.images).not.to.be.empty;
}
