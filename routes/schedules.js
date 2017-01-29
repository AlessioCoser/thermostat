var express = require('express')
var router = express.Router()

var Schedules = require('../lib/schedules')
var db = require('lowdb')('/var/node/default/db/db.json')
var schedules = new Schedules(db)

router.get('/', function(req, res) {
  var all = schedules.all().map(schedule => schedule.toJson())
  res.json({error: false, value: all})
})

router.post('/new', function(req, res) {
  var schedule = schedules.add({
    temperature: req.body.temperature,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    days: req.body.days
  })

  if(schedule === false) {
    res.json({error: true, value: "Schedule malformed"})
    return
  }

  res.json({error: false, value: schedule.toJson()})
})

module.exports = router
