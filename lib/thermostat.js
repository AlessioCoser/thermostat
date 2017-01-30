'use strict'

module.exports = class Thermostat {
  constructor (rele, sensor) {
    this._rele = rele
    this._sensor = sensor
  }

  setStatus (status) {
    if (status === true) {
      this._rele.turnOn()
    } else {
      this._rele.turnOff()
    }
    return this.getStatus()
  }

  getStatus () {
    return this._rele.isOn()
  }

  temperature () {
    return this._sensor.temperature()
  }

  shouldTurnOn (expectedTemperature) {
    return ((this._rele.isOff()) && (this.temperature() < expectedTemperature))
  }

  shouldTurnOff (expectedTemperature) {
    return ((this._rele.isOn()) && (this.temperature() >= expectedTemperature))
  }
}
