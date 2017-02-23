'use strict'

const db = require('APP/db')
const Member = require('./member')
const {expect} = require('chai')

describe('Member', () => {
describe('Member', () => {
  before('wait for the db', () => db.didSync)

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      Member.create({ password: 'ok' })
        .then(member => member.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      Member.create({ password: 'ok' })
        .then(member => member.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })
})
