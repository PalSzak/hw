const express = require('express')

const readConfigFile = require('./service/configHandler.js')
const produceFoodImageQuery = require('./service/queryFactory.js')
const ImageSupplier = require('./service/ImageSupplier.js')
const FoodDao = require('./dao/FoodDao.js')

global.DEFAULT_CONFIG = {
  db_name: 'HW',
  db_url: 'mongodb://localhost:27017'
}

async function start () {
  try {
    let config = await readConfigFile()
    let foodQuery = produceFoodImageQuery(config)
    let client = await FoodDao.connectToDatabase(config.db_url)
    let foodDao = new FoodDao(client, config.db_name)

    let imageSupplier = new ImageSupplier(foodQuery, foodDao)
    imageSupplier.loadNewImagesToDB()

    let app = express()
    app.use('/api', require('./routes/api.js')(foodDao))
    app.use('/photos', require('./routes/photos.js')(foodDao))
    app.use('/delay', require('./routes/delayedHelloWorld.js'))

    app.listen(3000, function () {
      console.log('HomeWork Application listening on http://0.0.0.0:3000 !')
    })
  } catch (e) {
    console.error(`
Application setup failed.
Root cause:
`, e)
  }
}

start()
