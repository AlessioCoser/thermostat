'use strict'

module.exports = class Schedule {
  constructor(temperature, fromTime, toTime, days) {
    this._temperature = temperature
    this._fromTime = fromTime
    this._toTime = toTime
    this._days = days
  }

  isValid() {
    return this._isNumber(this._temperature) &&
           this._isDayTime(this._fromTime) &&
           this._isDayTime(this._toTime) &&
           this._isTimeInterval(this._fromTime, this._toTime) &&
           this._isDayOption(this._days)
  }

  _isDayTime(value) {
    return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  }

  _isNumber(value) {
    return (typeof value === 'number')
  }

  _isDayOption(value) {
    return /^(week|saturday|sunday)$/
  }

  _isTimeInterval(from, to) {
    var from = parseFloat(from.split(':').join('.'))
    var to = parseFloat(to.split(':').join('.'))
    return from < to
  }
}
