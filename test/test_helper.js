'use strict'

class Rele {
  constructor (value) {
    this._value = value
  }

  turnOn () {
    this._value = 1
  }

  turnOff () {
    this._value = 0
  }

  isOn () {
    return this._value === 1
  }

  isOff () {
    return this._value === 0
  }
}

class TemperatureSensor {
  constructor(temp) {
    this._temp = temp || 19.2
  }
  temperature () {
    return this._temp
  }
}

module.exports = {
  Rele,
  TemperatureSensor
}
