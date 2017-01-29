const assert = require('assert')
const Schedule = require('../lib/schedule')
const Schedules  = require('../lib/schedules')
const LowDB = require('lowdb')
var db = LowDB()

describe('Schedules', function () {

  describe('all', function () {
    it('should return an empty array without elements', function() {
      db.setState({schedules: []})
      var schedules = new Schedules(db)

      assert.deepEqual(schedules.all(), [])
    })

    it('should return an array of schedule', function() {
      var obj = {id: 1, temperature: 19, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [obj]})
      var expectedSchedule = new Schedule(obj)

      var schedules = new Schedules(db)
      assert.deepEqual(schedules.all(), [expectedSchedule])
    })

    it('should return an array of valid schedule', function() {
      var invalid = {id: 1, temperature: 19}
      db.setState({schedules: [invalid]})

      var schedules = new Schedules(db)
      assert.deepEqual(schedules.all(), [])
    })
  })
})
