const assert = require('assert')
const Schedule = require('../lib/schedule')

describe('Schedule', function () {
  it('should not be valid without parameters', function () {
    var schedule = new Schedule()

    assert(!schedule.isValid())
  })

  it('should be valid with correct parameters', function () {
    var opt = {id: 1, temperature: 19.2, fromTime: '09:00', toTime: '12:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(schedule.isValid())
  })

  it('should not be valid without id', function () {
    var opt = {temperature: 19.2, fromTime: '09:00', toTime: '12:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with incorrect temperature', function () {
    var opt = {id: 1, temperature: 'asd', fromTime: '09:00', toTime: '12:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with incorrect hours of fromTime', function () {
    var opt = {id: 1, temperature: 19.3, fromTime: '24:00', toTime: '12:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with incorrect minutes of toTime', function () {
    var opt = {id: 1, temperature: 19.3, fromTime: '12:00', toTime: '18:60', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with fromTime greater than toTime', function () {
    var opt = {id: 1, temperature: 19.3, fromTime: '23:00', toTime: '12:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with fromTime equals toTime', function () {
    var opt = {id: 1, temperature: 19.3, fromTime: '23:00', toTime: '23:00', days: 'week'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should not be valid with days not in [week, saturday, sunday]', function () {
    var opt = {id: 1, temperature: 19.3, fromTime: '09:00', toTime: '18:00', days: 'inexistent'}
    var schedule = new Schedule(opt)

    assert(!schedule.isValid())
  })

  it('should returns a json', function () {
    var expectedJson = {id: 1, temperature: 19.3, fromTime: '09:00', toTime: '18:00', days: 'inexistent'}
    var schedule = new Schedule(expectedJson)

    assert.deepEqual(schedule.toJson(), expectedJson)
  })
})
