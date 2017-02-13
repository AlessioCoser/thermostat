'use strict'

module.exports = class TemperatureSensor {
  constructor (temp) {
    this._temp = temp || 19.2
  }
  temperature () {
    return this._temp
  }
}
