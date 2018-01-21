const assert = require('assert')
const sinon = require('sinon')
const readConfigFile = require('../../app/service/configHandler.js')

describe('Configuration handler', function () {
  beforeEach(function () {
    sinon.sandbox.stub(console, 'error')
  })

  afterEach(function () {
    console.error.restore()
  })

  it('reject in case of missing configuration', function (done) {
    readConfigFile('/non/existing/path').catch((e) => {
      if (!e) {
        done(new Error('Missing error object'))
      } else {
        done()
      }
    })
  })

  it('error message provided in case of error', function (done) {
    readConfigFile('/non/existing/path').catch((e) => {
      if (console.error.calledOnce) {
        done()
      } else {
        done(new Error('Missing error message'))
      }
    })
  })

  it('provide the configuration in json', function (done) {
    readConfigFile('./configuration/config.sample.json').then((config) => {
      try {
        assert.equal(
          config['500px_consumer-key'],
          'your secret key goes here',
          'Error in sample configuration reading')
        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
