const assert = require('assert')
const Schedule = require('../lib/schedule')

describe('Schedule', function () {

  it('should be not valid without parameters', function() {
    var schedule = new Schedule()

    assert(!schedule.isValid())
  })

  it('should be valid with correct parameters', function() {
    var schedule = new Schedule(19.2, '09:00', '12:00', 'week')

    assert(schedule.isValid())
  })

  it('should be not valid with incorrect temperature', function() {
    var schedule = new Schedule('asd', '09:00', '12:00', 'week')

    assert(!schedule.isValid())
  })

  it('should be not valid with incorrect fromTime', function() {
    var tooMuchHours = new Schedule(19.3, '24:00', '12:00', 'week')
    var tooMuchMinutes = new Schedule(19.3, '12:00', '18:60', 'week')

    assert(!tooMuchHours.isValid())
    assert(!tooMuchMinutes.isValid())
  })

  it('should be not valid with fromTime greater than toTime', function() {
    var schedule = new Schedule(19.3, '23:00', '12:00', 'week')

    assert(!schedule.isValid())
  })
})
