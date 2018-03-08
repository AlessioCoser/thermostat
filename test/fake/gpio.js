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

module.exports = Gpio
