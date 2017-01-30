const assert = require('assert')
const testHelper = require('./test_helper')
const Rele = testHelper.Rele
const TemperatureSensor = testHelper.TemperatureSensor
const Thermostat = require('../lib/thermostat')

describe('Thermostat', function () {
  describe('should not change state', function () {
    it('when rele is turned on and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(19.2))

      assert(!thermostat.shouldTurnOn(expectedTemperature))
      assert(!thermostat.shouldTurnOff(expectedTemperature))
    })

    it('when rele is turned off and temperature is higher than expected', function () {
      var expectedTemperature = 15
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(19.2))

      assert(!thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  describe('should I Turn On', function () {
    it('when rele is off and temperature is lower than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(0), new TemperatureSensor(15))

      assert(thermostat.shouldTurnOn(expectedTemperature))
    })
  })

  describe('should I Turn Off', function () {
    it('when rele is on and temperature is higher than expected', function () {
      var expectedTemperature = 20
      var thermostat = new Thermostat(new Rele(1), new TemperatureSensor(20))

      assert(thermostat.shouldTurnOff(expectedTemperature))
    })
  })
})
