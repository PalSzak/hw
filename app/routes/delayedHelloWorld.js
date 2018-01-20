const express = require('express')
const router = express.Router()
const FIVE_SEC_IN_MILLIS = 5 * 1000

router.get('/', function (req, res) {
  setTimeout(() => {
    res.send('Hello World!')
  }, FIVE_SEC_IN_MILLIS)
})

module.exports = router
