var express = require('express')
var router = express.Router()

var TemperatureSensor = require('../lib/temperature-sensor')
var Rele = require('../lib/rele')

var rele = new Rele(17)
var sensor = new TemperatureSensor()

router.get('/status', function(req, res) {
  res.json({error: false, value: rele.isOn()})
})

router.post('/status', function(req, res) {
  var statusParam = req.body.status
  if(typeof statusParam == "undefined") {
    res.json({error: true, value: null})
  }

  if (statusParam === "true") {
    rele.turnOn()
  } else {
    rele.turnOff()
  }

  res.json({error: false, value: rele.isOn()})
})

router.get('/temperature', function(req, res) {
  res.json({error: false, value: sensor.temperature()})
})

module.exports = router
