const ok = require('assert').ok

const Rele = require('../lib/rele')
const TemperatureSensor = require('./fake/temperature-sensor')
const Thermostat = require('../lib/thermostat')

test('Thermostat', function () {
  test('should not change state', function () {
    test('when rele is turned on and temperature is lower than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(4))
      thermostat.setStatus(true)

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is turned on and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(19.2))
      thermostat.setStatus(true)

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is turned off and temperature is higher than expected', function () {
      var expectedTemperature = 15
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(19.2))
      thermostat.setStatus(true)

      ok(!thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  test('should I Turn On', function () {
    test('when rele is turned off and temperature is lower than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(4))
      thermostat.setStatus(false)

      ok(thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is off and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(15))
      thermostat.setStatus(false)

      ok(thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  test('should I Turn Off', function () {
    test('when rele is turned on and temperature is higher than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(6))
      thermostat.setStatus(true)

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is on and temperature is higher than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(17), new TemperatureSensor(20))
      thermostat.setStatus(true)

      ok(thermostat.shouldTurnOff(expectedTemperature))
    })
  })
})
