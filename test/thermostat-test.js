const ok = require('assert').ok

const testHelper = require('./test_helper')
const Rele = testHelper.Rele
const TemperatureSensor = testHelper.TemperatureSensor
const Thermostat = require('../lib/thermostat')

test('Thermostat', function () {
  test('should not change state', function () {
    test('when rele is turned on and temperature is lower than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(4))

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is turned on and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(19.2))

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is turned off and temperature is higher than expected', function () {
      var expectedTemperature = 15
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(19.2))

      ok(!thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  test('should I Turn On', function () {
    test('when rele is turned off and temperature is lower than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(0), new TemperatureSensor(4))

      ok(thermostat.shouldTurnOn(expectedTemperature))
      ok(!thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is off and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(0), new TemperatureSensor(15))

      ok(thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  test('should I Turn Off', function () {
    test('when rele is turned on and temperature is higher than antifreeze', function () {
      var expectedTemperature = null
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(6))

      ok(!thermostat.shouldTurnOn(expectedTemperature))
      ok(thermostat.shouldTurnOff(expectedTemperature))
    })

    test('when rele is on and temperature is higher than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(20))

      ok(thermostat.shouldTurnOff(expectedTemperature))
    })
  })
})
