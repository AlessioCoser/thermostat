const ok = require('assert').ok
const equal = require('assert').equal
const deepEqual = require('assert').deepEqual

const LowDB = require('lowdb')
const Schedule = require('../lib/schedule')
const Schedules = require('../lib/schedules')

var db = LowDB()
var schedules = new Schedules(db)

test('Schedules', function () {
  test('all()', function () {
    test('should return an empty array without elements', function () {
      db.setState({schedules: []})

      deepEqual(schedules.all(), [])
    })

    test('should return an array of schedule', function () {
      var obj = {id: 1, temperature: 19, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [obj]})
      var expectedSchedule = new Schedule(obj)

      deepEqual(schedules.all(), [expectedSchedule])
    })

    test('should return an array of valid schedule', function () {
      var invalid = {id: 1, temperature: 19}
      db.setState({schedules: [invalid]})

      deepEqual(schedules.all(), [])
    })
  })

  test('add()', function () {
    test('shouldn\'t add invalid schedule', function () {
      var invalid = {id: 1, temperature: 19}
      db.setState({schedules: []})

      ok(schedules.add(invalid) === false)
      deepEqual(schedules.all(), [])
    })

    test('should add first schedule with id 1', function () {
      var schedule = {temperature: 19, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: []})

      var expectedResult = schedule
      expectedResult.id = 1

      deepEqual(schedules.add(schedule), new Schedule(expectedResult))
      deepEqual(schedules.all()[0], new Schedule(expectedResult))
    })

    test('should add schedule with id (max-id + 1)', function () {
      var oldSchedule = {id: 18, temperature: 20, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [oldSchedule]})
      var newSchedule = {temperature: 19, fromTime: '14:00', toTime: '18:00', days: 'saturday'}

      var expectedResult = newSchedule
      expectedResult.id = 19

      deepEqual(schedules.add(newSchedule), new Schedule(expectedResult))
      deepEqual(schedules.all()[1], new Schedule(expectedResult))
    })
  })

  test('find()', function () {
    test('should returns false if id not found', function () {
      db.setState({schedules: []})

      equal(schedules.find(1), false)
    })

    test('should returns found schedule', function () {
      var saved = {id: 1, temperature: 20, fromTime: '09:00', toTime: '12:00', days: 'week'}
      db.setState({schedules: [saved]})

      deepEqual(schedules.find(1), new Schedule(saved))
    })
  })

  test('current()', function () {
    var weekFriday = {id: 1, temperature: 15, fromTime: '09:00', toTime: '10:00', days: 'week'}
    var weekSaturday = {id: 3, temperature: 17, fromTime: '09:00', toTime: '10:00', days: 'saturday'}
    var weekSunday = {id: 5, temperature: 19, fromTime: '09:00', toTime: '10:00', days: 'sunday'}
    var saved = [
      weekFriday,
      {id: 2, temperature: 16, fromTime: '12:00', toTime: '13:00', days: 'week'},
      weekSaturday,
      {id: 4, temperature: 18, fromTime: '12:00', toTime: '13:00', days: 'saturday'},
      weekSunday,
      {id: 6, temperature: 20, fromTime: '12:00', toTime: '13:00', days: 'sunday'}
    ]

    test('should returns the current week schedule', function () {
      db.setState({schedules: saved})

      var friday = new Date(2017, 0, 27, 9, 30, 0)
      var schedules = new Schedules(db, friday)

      deepEqual(schedules.current(), new Schedule(weekFriday))
    })

    test('should returns the current saturday schedule', function () {
      db.setState({schedules: saved})

      var saturday = new Date(2017, 0, 28, 9, 30, 0)
      var schedules = new Schedules(db, saturday)

      deepEqual(schedules.current(), new Schedule(weekSaturday))
    })

    test('should returns the current sunday schedule', function () {
      db.setState({schedules: saved})

      var sunday = new Date(2017, 0, 29, 9, 30, 0)
      var schedules = new Schedules(db, sunday)

      deepEqual(schedules.current(), new Schedule(weekSunday))
    })
  })
})
