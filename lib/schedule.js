'use strict'

module.exports = class Schedule {
  constructor(object) {
    var obj = (object || {})

    this._temperature = obj.temperature
    this._fromTime = obj.fromTime
    this._toTime = obj.toTime
    this._days = obj.days
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
    return ["week","saturday","sunday"].indexOf(value) != -1
  }

  _isTimeInterval(from, to) {
    var from = parseFloat(from.split(':').join('.'))
    var to = parseFloat(to.split(':').join('.'))
    return from < to
  }
}
