const express = require('express')

module.exports = function (foodDao) {
  const router = express.Router()

  router.get('/photos', function (req, res) {
    foodDao.getAll()
      .then((documents) => res.json(documents))
      .catch((err) => {
        console.error('Error during GET photos call', err)
        res.status(500).send('Error during GET photos call')
      })
  })

  router.delete('/photos', function (req, res) {
    foodDao.wipeOut()
      .then((documents) => res.end())
      .catch((err) => {
        console.error('Error during db clean', err)
        res.status(500).send('Error during db clean')
      })
  })

  return router
}
