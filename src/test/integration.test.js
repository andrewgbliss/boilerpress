const { expect } = require('chai');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const boilerpress = require('../examples/default/express');

const URL = `http://localhost:${process.env.PORT}/`;

describe('routes', () => {
  before(() => boilerpress.start());
  after(() => boilerpress.stop());
  it('should GET /', async () => {
    const res = await request(URL);
    expect(res.statusCode).to.equal(200);
  });
});
