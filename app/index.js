const express = require('express')

const readConfigFile = require('./service/configHandler.js')
const produceFoodImageQuery = require('./service/queryFactory.js')
const ImageSupplier = require('./service/ImageSupplier.js')

async function start () {
  try {
    let config = await readConfigFile()
    let foodQuery = produceFoodImageQuery(config)
    let foodDao = new (require('./dao/FoodDao.js'))()

    /* eslint-disable no-unused-vars */
    let imageSupplier = new ImageSupplier(foodQuery)
    /* eslint-enable no-unused-vars */

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
