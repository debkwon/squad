'use strict'

const debug = require('debug')('oauth')
const Sequelize = require('sequelize')
const db = require('APP/db')
const Member= require('./member')

const OAuth = db.define('oauths', {
  uid: Sequelize.STRING,
  provider: Sequelize.STRING,

  // OAuth v2 fields
  accessToken: Sequelize.STRING,
  refreshToken: Sequelize.STRING,

  // OAuth v1 fields
  token: Sequelize.STRING,
  tokenSecret: Sequelize.STRING,

  // The whole profile as JSON
  profileJson: Sequelize.JSON,
}, {
	indexes: [{fields: ['uid'], unique: true,}],
})

OAuth.V2 = (accessToken, refreshToken, profile, done) =>
  OAuth.findOrCreate({
    where: {
      provider: profile.provider,
      uid: profile.id,
    }})
    .spread(oauth => {
      debug('provider:%s will log in user:{name=%s uid=%s}',
        profile.provider,
        profile.displayName,
        profile.uid)
      oauth.profileJson = profile
      oauth.accessToken = accessToken
      return db.Promise.props({
        oauth,
        member: oauth.getUser(),
        _saveProfile: oauth.save(),
      })
    })
    .then(({ oauth, member }) => member ||
      Member.create({
        name: profile.displayName,
      }).then(member => db.Promise.props({
        member,
        _setOauthUser: oauth.setUser(member)
      }))
    )
    .then(({ member }) => done(null, member))
    .catch(done)


OAuth.setupStrategy =
({
  provider,
  strategy,
  config,
  oauth=OAuth.V2,
  passport
}) => {
  const undefinedKeys = Object.keys(config)
        .map(k => config[k])
        .filter(value => typeof value === 'undefined')
  if (undefinedKeys.length) {
    undefinedKeys.forEach(key =>
      debug('provider:%s: needs environment var %s', provider, key))
    debug('provider:%s will not initialize', provider)
    return
  }

  debug('initializing provider:%s', provider)
  passport.use(new strategy(config, oauth))
}

module.exports = OAuth
