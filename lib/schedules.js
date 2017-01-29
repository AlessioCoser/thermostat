'use strict'

var Schedule = require('./schedule')

module.exports = class Schedules {
  constructor(db) {
    this._db = db
  }

  all() {
    return this._db.get('schedules').sortBy('id').value().reduce(this._toSchedule.bind(this), [])
  }

  add(params) {
    params.id = this._nextId()
    var schedule = new Schedule(params)

    if(!schedule.isValid()) {
      return false
    }

    this._db.get('schedules').push(schedule.toJson()).value()
    return schedule.toJson()
  }

  _toSchedule(acc, obj) {
    var schedule = new Schedule(obj)

    if(schedule.isValid()) {
      acc.push(schedule)
    }

    return acc
  }

  _nextId() {
    var maxSchedule = this._db.get('schedules').sortBy('id').value().slice(-1)[0]

    if(typeof maxSchedule == 'undefined') {
      return 1
    }
    return maxSchedule.id + 1
  }
}
