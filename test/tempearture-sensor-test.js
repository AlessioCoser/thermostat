const assert = require('assert')
const TemperatureSensor = require('../lib/temperature-sensor')

describe('TemperatureSensor', function () {
  var sensor = new TemperatureSensor()

  describe('temperature method', function () {
    it('should return a number', function () {
      assert(typeof sensor.temperature() === 'number')
    })

    it('should be greater than -10', function () {
      assert(sensor.temperature() > -10)
    })

    it('should be lower than 60', function () {
      assert(sensor.temperature() < 60)
    })
  })
})
