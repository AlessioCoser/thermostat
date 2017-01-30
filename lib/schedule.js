'use strict'

module.exports = class Schedule {
  constructor (object) {
    var obj = (object || {})

    this._id = obj.id
    this._temperature = obj.temperature
    this._fromTime = obj.fromTime
    this._toTime = obj.toTime
    this._days = obj.days
  }

  isValid () {
    return this._hasAnIdentifier(this._id) &&
           this._isPositiveNumber(this._temperature) &&
           this._isDayTime(this._fromTime) &&
           this._isDayTime(this._toTime) &&
           this._isTimeInterval(this._fromTime, this._toTime) &&
           this._isDayOption(this._days)
  }

  days () {
    return this._days
  }

  temperature () {
    return this._temperature
  }

  isInTime (date) {
    var currentTime = date.getHours() + (date.getMinutes() / 100)
    var fromTime = parseFloat(this._fromTime.split(':').join('.'))
    var toTime = parseFloat(this._toTime.split(':').join('.'))

    return ((currentTime >= fromTime) && (currentTime < toTime))
  }

  toJson () {
    return {
      id: this._id,
      temperature: this._temperature,
      fromTime: this._fromTime,
      toTime: this._toTime,
      days: this._days
    }
  }

  _isDayTime (value) {
    return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value)
  }

  _isPositiveNumber (value) {
    return (typeof value === 'number') && (value > 0)
  }

  _isDayOption (value) {
    return ['week', 'saturday', 'sunday'].indexOf(value) !== -1
  }

  _isTimeInterval (from, to) {
    from = parseFloat(from.split(':').join('.'))
    to = parseFloat(to.split(':').join('.'))
    return from < to
  }

  _hasAnIdentifier (identifier) {
    return this._isPositiveNumber(identifier) && (identifier > 0)
  }
}
