const assert = require('assert')
const ImageSupplier = require('../../app/service/ImageSupplier.js')

describe('Image supplier', function () {
  let imageSupplier

  it('Can be constructed with default parameters', function () {
    imageSupplier = new ImageSupplier()
    assert(imageSupplier, "Can't create image supplier")
  })

  describe('Timing related functionality', function () {
    it('Fire event in given time period', function (done) {
      this.timeout(350)

      imageSupplier = new (class MockedImageSupplier extends ImageSupplier {
        constructor () {
          super(undefined, 100)
          this.counter = 0
        }

        loadNewImagesToDB () {
          this.counter++
          if (this.counter === 3) {
            done()
          }
        }
      })()
    })
  })

  afterEach(function () {
    imageSupplier.dispose()
    imageSupplier = undefined
  })
})
