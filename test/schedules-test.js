const assert = require('assert')
const Schedule = require('../lib/schedule')
const Schedules  = require('../lib/schedules')
const LowDB = require('lowdb')
var db = LowDB()
var schedules = new Schedules(db)

describe('Schedules', function () {
  describe('all()', function () {
    it('should return an empty array without elements', function() {
      db.setState({schedules: []})

      assert.deepEqual(schedules.all(), [])
    })

    it('should return an array of schedule', function() {
      var obj = {id: 1, temperature: 19, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [obj]})
      var expectedSchedule = new Schedule(obj)

      assert.deepEqual(schedules.all(), [expectedSchedule])
    })

    it('should return an array of valid schedule', function() {
      var invalid = {id: 1, temperature: 19}
      db.setState({schedules: [invalid]})

      assert.deepEqual(schedules.all(), [])
    })
  })

  describe('add()', function() {
    it("shouldn't add invalid schedule", function() {
      var invalid = {id: 1, temperature: 19}
      db.setState({schedules: []})

      assert(schedules.add(invalid) === false)
      assert.deepEqual(schedules.all(), [])
    })

    it("should add first schedule with id 1", function() {
      var schedule = {temperature: 19, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: []})

      expectedResult = schedule
      expectedResult.id = 1

      assert.deepEqual(schedules.add(schedule), new Schedule(expectedResult))
      assert.deepEqual(schedules.all()[0], new Schedule(expectedResult))
    })

    it("should add schedule with id (max-id + 1)", function() {
      var oldSchedule = {id: 18, temperature: 20, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [oldSchedule]})
      var newSchedule = {temperature: 19, fromTime: '14:00', toTime: '18:00', days: 'saturday'}

      expectedResult = newSchedule
      expectedResult.id = 19

      assert.deepEqual(schedules.add(newSchedule), new Schedule(expectedResult))
      assert.deepEqual(schedules.all()[1], new Schedule(expectedResult))
    })
  })
})
