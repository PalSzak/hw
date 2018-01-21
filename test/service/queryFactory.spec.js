const assert = require('assert')
const produceFoodImageQuery = require('../../app/service/queryFactory.js')

describe('Query Factory', function () {
  it('produce error in case of missing api key', function () {
    try {
      produceFoodImageQuery({})
      assert(undefined, 'Error should trown')
    } catch (e) {
      if (!e.message.startsWith('Mandatory config parameter')) {
        throw e
      }
    }
  })

  it('in case of valid config it produce a function', function () {
    let query = produceFoodImageQuery({ '500px_consumer-key': 'any' })
    assert.equal(typeof query, 'function', 'Return type mismatch')
  })
})
