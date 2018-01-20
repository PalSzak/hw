const express = require('express')

module.exports = function (foodDao) {
  const router = express.Router()

  router.get('/photos', function (req, res) {
    res.json(foodDao.getAll())
  })

  router.delete('/photos', function (req, res) {
    res.end()
  })

  return router
}
