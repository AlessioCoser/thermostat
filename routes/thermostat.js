var express = require('express')
var router = express.Router()

router.get('/status', function(req, res) {
  res.json({error: false, value: true})
})

router.post('/status', function(req, res) {
  res.json({error: false, value: true})
})

router.get('/temperature', function(req, res) {
  res.json({error: false, value: 19.0})
})

module.exports = router
