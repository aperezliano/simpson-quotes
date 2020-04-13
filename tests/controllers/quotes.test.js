const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

describe('Quotes Controller', function () {
  describe('GET random quote', () => {
    it('Should return a quote, status 200 & content-type json', async () => {
      const response = await request(app).get('/quotes').expect(200);
      checkResponseBody(response.body);
    });
  });

  describe('GET random Simpsons quote', () => {
    it('Should return a quote, status 200 & content-type json', async () => {
      const response = await request(app).get('/quotes/simpsons').expect(200);
      checkResponseBody(response.body);
    });
  });
});

function checkResponseBody(responseBody) {
  expect(responseBody).to.have.all.keys('quote', 'author');
  expect(responseBody.quote).not.to.be.empty;
  expect(responseBody.author).not.to.be.empty;
}
