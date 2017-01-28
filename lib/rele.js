'use strict'

var Gpio = require('onoff').Gpio

module.exports = class Rele {
  constructor(pin) {
    this._gpio = new Gpio(pin, "out")
  }

  turnOn(){
    this._gpio.writeSync(1)
  }

  turnOff(){
    this._gpio.writeSync(0)
  }

  isOn(){
    return this._gpio.readSync() === 1
  }

  isOff(){
    return this._gpio.readSync() === 0
  }
}
