'use strict'

var Schedule = require('./schedule')

module.exports = class Schedules {
  constructor(db) {
    this._db = db.get('schedules')
  }

  all() {
    return this._db.sortBy('id').value()
  }
}
