var express = require('express')
var TemperatureSensor = require('../lib/temperature-sensor')
var Rele = require('../lib/rele')
var Thermostat = require('../lib/thermostat')

var router = express.Router()
var rele = new Rele(17)
var sensor = new TemperatureSensor()
var thermostat = new Thermostat(rele, sensor)

var db = require('lowdb')('/var/node/default/db/db.json')
var Schedules = require('../lib/schedules')

setInterval(function () {
  var schedules = new Schedules(db)
  var currentSchedule = schedules.current()
  var expectedTemperature = null

  if (currentSchedule) {
    expectedTemperature = currentSchedule.temperature()
  }

  thermostat.checkTemperature(expectedTemperature)
}, 60000)

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
