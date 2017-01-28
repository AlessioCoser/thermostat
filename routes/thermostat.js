var express = require('express')
var router = express.Router()

router.get('/status', function(req, res) {
  res.json({error: false, value: true})
})

router.post('/status', function(req, res) {
  if(typeof req.body.status == "undefined") {
    res.json({error: true, value: null})
  } else {
    var status = (req.body.status === "true")

    res.json({error: false, value: status})
  }
})

router.get('/temperature', function(req, res) {
  var random = (Math.floor(Math.random() * 100) + 1) / 10
  res.json({error: false, value: random})
})

module.exports = router
