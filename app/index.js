const express = require('express')
const app = express()

const foodDao = new (require('./dao/FoodDao.js'))()

app.use('/api', require('./routes/api.js')(foodDao))
app.use('/photos', require('./routes/photos.js')(foodDao))

app.listen(3000, function () {
  console.log('HomeWork Application listening on http://0.0.0.0:3000 !')
})
