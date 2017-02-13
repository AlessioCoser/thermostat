'use strict'

class Gpio {
  constructor (pin, mode) {
    this._status = 0
  }

  writeSync (number) {
    this._status = number
  }

  readSync () {
    return this._status
  }
}

function isRasperry () {
  const hostname = require('os').hostname
  return /^raspberrypi$/gi.test(hostname())
}

if(isRasperry()) {
  module.exports = require('onoff').Gpio
} else {
  module.exports = Gpio
}
