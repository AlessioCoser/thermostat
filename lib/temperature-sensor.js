'use strict'

var sensorLib = require('ds18b20')

module.exports = class TemperatureSensor {
  constructor() {
    this._sensorLib = sensorLib
    this._sensorIds = []

    this._sensorLib.sensors((err, ids) => {
      this._sensorIds = ids
    })
  }

  temperature() {
    var temperatures = this._sensorIds.map((id) => { return this._sensorLib.temperatureSync(id) })

    if(Array.isArray(temperatures) && temperatures.length > 0) {
      return temperatures[0]
    }
    return null
  }
}
