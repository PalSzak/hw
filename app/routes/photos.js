const express = require('express')

module.exports = function (foodDao) {
  const photos = express()

  photos.set('view engine', 'ejs')
  photos.set('views', './app/views')

  photos.get('/food', function (req, res) {
    res.render('pages/food', {
      images: foodDao.getRecent10()
    })
  })

  return photos
}
