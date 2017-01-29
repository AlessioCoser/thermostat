'use strict'

var Schedule = require('./schedule')

module.exports = class Schedules {
  constructor (db, currentDate) {
    this._db = db
    this._currentDate = currentDate || new Date()
  }

  all () {
    return this._db.get('schedules').sortBy('id').value().reduce(this._toSchedule.bind(this), [])
  }

  find (id) {
    var element = this._db.get('schedules').find({id: id}).value()
    var schedule = new Schedule(element)

    if (schedule.isValid()) {
      return schedule
    }
    return false
  }

  add (params) {
    params.id = this._nextId()
    var schedule = new Schedule(params)

    if (schedule.isValid()) {
      this._db.get('schedules').push(schedule.toJson()).value()
      return schedule
    }

    return false
  }

  current () {
    return this.all().reduce((acc, schedule) => {
      if ((this._currentWeekDay() === schedule.days()) &&
        (schedule.isInTime(this._currentDate))) {
        acc.push(schedule)
      }

      return acc
    }, [])[0]
  }

  _currentWeekDay () {
    var weekDay = this._currentDate.getDay()
    if (weekDay === 0) {
      return 'sunday'
    }
    if (weekDay === 6) {
      return "saturday"
    }
    return "week"
  }

  _toSchedule (acc, obj) {
    var schedule = new Schedule(obj)

    if (schedule.isValid()) {
      acc.push(schedule)
    }

    return acc
  }

  _nextId () {
    var maxSchedule = this._db.get('schedules').sortBy('id').value().slice(-1)[0]

    if (maxSchedule) {
      return maxSchedule.id + 1
    }

    return 1
  }
}
