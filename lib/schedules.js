'use strict'

var Schedule = require('./schedule')

module.exports = class Schedules {
  constructor (db, initialDate) {
    this._db = db
    this._initialDate = initialDate || null
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
    return this._scheduleAt(this._currentDate())
  }

  next () {
    var current = this.current()
    if (current) {
      var nextDate = this._nextStartTime(current.toTime())
      return this._scheduleAt(nextDate)
    }
    return null
  }

  _nextStartTime (timeString) {
    var timeArray = timeString.split(':')
    var hours = timeArray[0]
    var minutes = timeArray[1]

    var nextDate = this._currentDate()
    nextDate.setUTCHours(hours)
    nextDate.setUTCMinutes(minutes)
    return new Date(nextDate.getTime() + 1 * 60000)
  }

  _scheduleAt (date) {
    var currentSchedule = this.all().reduce((acc, schedule) => {
      if (schedule.match(date, this._currentWeekDay())) {
        acc.push(schedule)
      }

      return acc
    }, [])[0]

    return currentSchedule || null
  }

  _currentWeekDay () {
    var weekDay = this._currentDate().getDay()
    if (weekDay === 0) {
      return 'sunday'
    }
    if (weekDay === 6) {
      return 'saturday'
    }
    return 'week'
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

  _currentDate () {
    return this._initialDate || new Date()
  }
}
