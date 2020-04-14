const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

describe('Quotes Controller', function () {
  this.timeout(5000);

  describe('GET random Simpsons quote', () => {
    it('Should return a quote, status 200 & content-type json', async () => {
      const response = await request(app).get('/quotes/simpsons').expect(200);
      checkQuoteResponseBody(response.body);
    });
  });

  describe('GET random quote & author info', () => {
    it('Should return a quote, the author info, status 200 & content-type json', async () => {
      const response = await request(app).get('/quotes/quote-and-info').expect(200);
      checkQuoteResponseBody(response.body);
      checkAuthorResponseBody(response.body);
    });
  });
});

function checkQuoteResponseBody(responseBody) {
  expect(responseBody).to.have.any.keys('quote', 'author');
  expect(responseBody.quote).not.to.be.empty;
  expect(responseBody.author).not.to.be.empty;
}

function checkAuthorResponseBody(responseBody) {
  expect(responseBody).to.have.any.keys('text', 'images');
}
