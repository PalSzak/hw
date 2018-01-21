const express = require('express')
const fs = require('fs-extra')
const app = express()
const API500px = require('500px')

const CONFIG_FILE_LOCATION = './configuration/config.json'

const foodDao = new (require('./dao/FoodDao.js'))()

fs.readJson(CONFIG_FILE_LOCATION).then((config) => {
  console.log(JSON.stringify(config, null, 2))

  let api500px = new API500px(config['500px_consumer-key'])

  let fetchImages = api500px.photos.searchByTag.bind(
    api500px.photos,
    'food',
    {
      'sort': 'created_at',
      'rpp': '100',
      'tags': true
    })

  fetchImages(function (error, results) {
    if (error) {
      console.log('something went wrong', error)
      return
    }
    console.log('result', JSON.stringify(results, null, 2))
  })
}).catch((e) => {
  console.error(`
Error during configuration reading.

Do you provide valid config.json?
For further information pease check README.md`, e)
})

app.use('/api', require('./routes/api.js')(foodDao))
app.use('/photos', require('./routes/photos.js')(foodDao))
app.use('/delay', require('./routes/delayedHelloWorld.js'))

app.listen(3000, function () {
  console.log('HomeWork Application listening on http://0.0.0.0:3000 !')
})
