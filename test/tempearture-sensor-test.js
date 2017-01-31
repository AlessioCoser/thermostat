const ok = require('assert').ok
const describe = require('m.test').test
const it = require('m.test').test

const TemperatureSensor = require('../lib/temperature-sensor')

describe('TemperatureSensor', function () {
  var sensor = new TemperatureSensor()

  describe('temperature method', function () {
    it.skip('should not return null', function (done) {
      setTimeout(function () {
        ok(sensor.temperature() !== null)
        done()
      }, 1000)
    }, !isRasperry())

    it.skip('should return a number', function (done) {
      setTimeout(function () {
        ok(typeof sensor.temperature() === 'number')
        done()
      }, 1000)
    }, !isRasperry())

    it.skip('should be greater than -10', function () {
      ok(sensor.temperature() > -10)
    }, !isRasperry())

    it.skip('should be lower than 60', function () {
      ok(sensor.temperature() < 60)
    }, !isRasperry())
  })

  function isRasperry () {
    const hostname = require('os').hostname
    return /^raspberrypi$/gi.test(hostname())
  }
})
