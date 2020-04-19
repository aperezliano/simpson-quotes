const { expect } = require('chai');
const sinon = require('sinon');

const _baseService = require('../../src/services/_base');
const quotesService = require('../../src/services/quotes');

describe('Base Service', function () {
  const chai = require('chai');
  const chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  let _baseStub;

  beforeEach(function () {
    _baseStub = sinon.stub(_baseService, 'fetch');
  });

  afterEach(function () {
    _baseStub.restore();
  });

  describe('Success cases', function () {
    it('Should return a quote, status 200', async () => {
      _baseStub.returns({ status: 200, json: () => [{ character: 'character', image: 'image', quote: 'quote' }] });

      const result = await quotesService.getRandomSimpsonsQuotes('url');
      expect(result).to.be.an.instanceof(Array);
      expect(result).to.to.have.lengthOf(1);
      expect(result[0]).to.to.have.all.keys(['character', 'image', 'quote']);
    });
  });

  describe('Failure cases', function () {
    it('Should return an Error', async () => {
      _baseStub.throws();
      await expect(quotesService.getRandomSimpsonsQuotes('url')).to.be.rejected;
    });
  });
});
