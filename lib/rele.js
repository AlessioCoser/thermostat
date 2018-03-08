'use strict'

module.exports = class Rele {
  constructor (pin, gpio) {
    this._gpio = gpio || this._instantiateGpio(pin)
  }

  turnOn () {
    this._gpio.writeSync(1)
  }

  turnOff () {
    this._gpio.writeSync(0)
  }

  isOn () {
    return this._gpio.readSync() === 1
  }

  isOff () {
    return this._gpio.readSync() === 0
  }

  _instantiateGpio (pin) {
    var Gpio = require('onoff').Gpio
    return new Gpio(pin, 'out')
  }
}
