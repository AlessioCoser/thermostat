var express = require('express')
var TemperatureSensor = require('../lib/temperature-sensor')
var Rele = require('../lib/rele')
var Thermostat = require('../lib/thermostat')

var router = express.Router()
var rele = new Rele(17)
var sensor = new TemperatureSensor()
var thermostat = new Thermostat(rele, sensor)

router.get('/status', function (req, res) {
  res.json({error: false, value: thermostat.getStatus()})
})

router.post('/status', function (req, res) {
  var statusParam = req.body.status
  if (typeof statusParam === 'undefined') {
    res.json({error: true, value: null})
  }
  var newStatus = thermostat.setStatus(statusParam === 'true')

  res.json({error: false, value: newStatus})
})

router.get('/temperature', function (req, res) {
  res.json({error: false, value: thermostat.temperature()})
})

module.exports = router
