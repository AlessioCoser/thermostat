const assert = require('assert')
const Schedules = require('../lib/schedules')
const LowDB = require('lowdb')
const db = LowDB()

describe('Schedules', function () {
  const schedules = new Schedules(db)

  describe('all', function () {
    it('should return an empty array without elements', function() {

      assert.deepEqual(schedules.all(), [])
    })
  })
})
