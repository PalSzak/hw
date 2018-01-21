const express = require('express')

module.exports = function (foodDao) {
  const photos = express()

  photos.set('view engine', 'ejs')
  photos.set('views', './app/views')

  photos.get('/food', function (req, res) {
    foodDao.getRecent10()
      .then((recentImages) => {
        res.render('pages/food', {
          images: recentImages
        })
      }).catch((e) => {
        res.status(500).send('Error during db clean')
      })
  })

  return photos
}
