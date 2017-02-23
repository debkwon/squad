'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Member= require('./member')
const OAuth = require('./oauth')
const Pod = require('./pod')

OAuth.belongsTo(Member)
Member.hasOne(OAuth)

module.exports = {Member, Pod, OAuth}
