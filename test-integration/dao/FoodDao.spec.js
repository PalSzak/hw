const FoodDao = require('../../app/dao/FoodDao.js')

describe('Food Dao', function () {
  it('connection to database', function (done) {
    this.timeout(5000)
    FoodDao.connectToDatabase('mongodb://localhost:27017')
      .then((client) => {
        let foodDao = new FoodDao(client, 'test')
        foodDao.dispose()
        done()
      }).catch((e) => {
        done(e)
      })
  })
})
