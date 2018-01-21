const assert = require('assert')
const fs = require('fs-extra')
const ImageSupplier = require('../../app/service/ImageSupplier.js')
const sinon = require('sinon')

describe('Image supplier', function () {
  let imageSupplier

  describe('Timing related functionality', function () {
    it('Fire event in given time period', function (done) {
      this.timeout(350)

      imageSupplier = new (class MockedImageSupplier extends ImageSupplier {
        constructor () {
          super(undefined, undefined, 100)
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

    describe('error from query', function () {
      let dummyQuery

      before(function () {
        dummyQuery = function (callback) {
          callback(new Error('Something went wrong'))
        }
      })

      beforeEach(function () {
        sinon.sandbox.stub(console, 'error')
      })

      afterEach(function () {
        console.error.restore()
      })

      it('Error logged properly', function (done) {
        imageSupplier = new ImageSupplier(dummyQuery)
        imageSupplier.loadNewImagesToDB()

        setTimeout(() => {
          if (console.error.calledOnce) {
            done()
          } else {
            done(new Error('Missing error message'))
          }
        }, 0)
      })
    })

    it('Store result to database', function (done) {
      imageSupplier = new ImageSupplier(
        (cb) => cb(null, { photos: [] }),
        { storeIfNew: () => done() })
      imageSupplier.loadNewImagesToDB()
    })
  })

  describe('Data mapping related functionality', function () {
    let dummyData

    before(function () {
      dummyData = fs.readJsonSync('./test/resources/sampleImagesQuery.json')
    })

    beforeEach(function () {
      imageSupplier = new ImageSupplier()
      sinon.sandbox.stub(console, 'warn')
    })

    afterEach(function () {
      console.warn.restore()
    })

    it('map an image properly', function () {
      let expected = {
        external_id: 243272481,
        name: 'Strawberries in focus',
        url: '/photo/243272481/strawberries-in-focus-by-deenanath-kulkarni',
        thumbnail_url: 'https://drscdn.500px.org/photo/243272481/q%3D50_w%3D140_h%3D140/v2?client_application_id=46197&webp=true&v=0&sig=7d791791d0fe106fa22ea48db1de860a591bce85f72d0802b1f7becace1f4b0d',
        created_at: '2018-01-21T04:52:48-05:00',
        taken_at: '2017-12-16T07:35:11-05:00',
        tags: [ 'street',
          'food',
          'strawberry',
          'raspberry',
          'food and drink',
          'nutritious',
          'healthy eating',
          'ready to eat' ],
        author_information: {
          user_id: 24969333,
          username: 'deen007'
        }
      }
      let actual = imageSupplier.mapImage(dummyData.photos[0])
      assert.deepStrictEqual(actual, expected, 'Photo mapping error')
    })

    it('map an image properly - missing taken_at', function () {
      let expected = {
        external_id: 243272481,
        name: 'Strawberries in focus',
        url: '/photo/243272481/strawberries-in-focus-by-deenanath-kulkarni',
        thumbnail_url: 'https://drscdn.500px.org/photo/243272481/q%3D50_w%3D140_h%3D140/v2?client_application_id=46197&webp=true&v=0&sig=7d791791d0fe106fa22ea48db1de860a591bce85f72d0802b1f7becace1f4b0d',
        created_at: '2018-01-21T04:52:48-05:00',
        tags: [ 'street',
          'food',
          'strawberry',
          'raspberry',
          'food and drink',
          'nutritious',
          'healthy eating',
          'ready to eat' ],
        author_information: {
          user_id: 24969333,
          username: 'deen007'
        }
      }
      let testImage = Object.assign({}, dummyData.photos[0])
      delete testImage.taken_at

      let actual = imageSupplier.mapImage(testImage)
      assert.deepStrictEqual(actual, expected, 'Photo mapping error')
    })

    it('map an image properly - missing taken_at', function () {
      let expected = {
        external_id: 243272481,
        name: 'Strawberries in focus',
        url: '/photo/243272481/strawberries-in-focus-by-deenanath-kulkarni',
        thumbnail_url: 'https://drscdn.500px.org/photo/243272481/q%3D50_w%3D140_h%3D140/v2?client_application_id=46197&webp=true&v=0&sig=7d791791d0fe106fa22ea48db1de860a591bce85f72d0802b1f7becace1f4b0d',
        created_at: '2018-01-21T04:52:48-05:00',
        tags: [ 'street',
          'food',
          'strawberry',
          'raspberry',
          'food and drink',
          'nutritious',
          'healthy eating',
          'ready to eat' ],
        author_information: {
          user_id: 24969333,
          username: 'deen007'
        }
      }
      let testImage = Object.assign({}, dummyData.photos[0])
      testImage.taken_at = testImage.created_at

      let actual = imageSupplier.mapImage(testImage)
      assert.deepStrictEqual(actual, expected, 'Photo mapping error')
    })

    it('map all images', function () {
      let result = imageSupplier.mapImages(dummyData)
      assert.equal(result.length, 100, 'Missing photo')
    })

    it('skip malformed images', function () {
      let result = imageSupplier.mapImages({
        photos: [
          {},
          { id: 'an id' },
          { id: 'id', name: 'name' }
        ]
      })
      assert(console.warn.calledThrice, 'Missing warning message')
      assert.equal(result.length, 0, 'Invalid photo mapped')
    })

    it('map all images', function () {
      let result = imageSupplier.mapImages(dummyData)
      assert.equal(result.length, 100, 'Missing photo')
    })
  })

  afterEach(function () {
    imageSupplier.dispose()
    imageSupplier = undefined
  })
})
