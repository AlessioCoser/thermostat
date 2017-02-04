const ok = require('assert').ok

const TemperatureSensor = require('../lib/temperature-sensor')

test('TemperatureSensor', function () {
  test.skip('temperature method', function () {
    var sensor = new TemperatureSensor()

    test('should not return null', function (done) {
      setTimeout(function () {
        ok(sensor.temperature() !== null)
        done()
      }, 1000)
    })

    test('should return a number', function (done) {
      setTimeout(function () {
        ok(typeof sensor.temperature() === 'number')
        done()
      }, 1000)
    })

    test('should be greater than -10', function () {
      ok(sensor.temperature() > -10)
    })

    test('should be lower than 60', function () {
      ok(sensor.temperature() < 60)
    })
  }, !isRasperry())

  function isRasperry () {
    const hostname = require('os').hostname
    return /^raspberrypi$/gi.test(hostname())
  }
})
