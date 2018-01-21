const assert = require('assert')
const produceFoodImageQuery = require('../../app/service/queryFactory.js')
const readConfigFile = require('../../app/service/configHandler.js')

global.DEFAULT_CONFIG = {}

describe('Query Factory', function () {
  it('food query against 500px', function (done) {
    this.timeout(5000)
    readConfigFile()
      .then(produceFoodImageQuery)
      .then((foodQuery) => {
        foodQuery((error, results) => {
          try {
            if (error) {
              done(error)
            }

            assert.equal(results.photos.length, 100, 'Unexpected number of photos')

            // TODO validate data here to detect api changes

            done()
          } catch (e) {
            done(e)
          }
        })
      }).catch((e) => {
        done(e)
      })
  })
})
