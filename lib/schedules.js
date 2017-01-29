'use strict'

var Schedule = require('./schedule')

module.exports = class Schedules {
  constructor(db) {
    this._db = db
  }

  all() {
    return this._db.get('schedules').sortBy('id').value().reduce(this._toSchedule.bind(this), [])
  }

  _toSchedule(acc, obj) {
    var schedule = new Schedule(obj)

    if(schedule.isValid()) {
      acc.push(schedule)
    }

    return acc
  }
}
