const { expect } = require('chai');
const sinon = require('sinon');

const _baseService = require('../../src/services/_base');
const wikiService = require('../../src/services/wikipedia');

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
      _baseStub.returns({ status: 200, json: () => ({ parse: { text: 'text', images: ['image'] } }) });

      const result = await wikiService.getArticleByTitle('title');
      expect(result).to.to.have.all.keys(['text', 'images']);
      expect(result.images).to.be.an.instanceof(Array);
    });
  });

  describe('Failure cases', function () {
    it('Should return an Error', async () => {
      _baseStub.throws();
      await expect(wikiService.getArticleByTitle('title')).to.be.rejected;
    });
  });
});
