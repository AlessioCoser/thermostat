var path = require('path')
var express = require('express')
var db = require('lowdb')(path.join(__dirname, '../db/db.json'))
var Schedules = require('../lib/schedules')

var router = express.Router()
var schedules = new Schedules(db)

router.get('/', function (req, res) {
  var all = schedules.all().map(schedule => schedule.toJson())
  res.json({error: false, value: all})
})

router.get('/current', function (req, res) {
  var schedule = schedules.current()

  if (schedule === null) {
    res.json({error: false, value: {temperature: 5, fromTime: null, toTime: null}})
  } else {
    res.json({error: false, value: schedule.toJson()})
  }
})
router.get('/next', function (req, res) {
  var schedule = schedules.next()

  if (schedule === null) {
    res.json({error: false, value: {temperature: 5, fromTime: null, toTime: null}})
  } else {
    res.json({error: false, value: schedule.toJson()})
  }
})

router.get('/:scheduleId', function (req, res) {
  var schedule = schedules.find(parseInt(req.params.scheduleId, 10))
  if (schedule === false) {
    res.json({error: true, value: 'Schedule not found'})
    return
  }
  res.json({error: false, value: schedule.toJson()})
})

router.post('/new', function (req, res) {
  var schedule = schedules.add({
    temperature: parseInt(req.body.temperature, 10),
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    days: req.body.days
  })

  if (schedule === false) {
    res.json({error: true, value: 'Schedule malformed'})
    return
  }

  res.json({error: false, value: schedule.toJson()})
})

module.exports = router
