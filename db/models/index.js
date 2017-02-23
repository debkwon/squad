'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const db = require('APP/db');
const Member= require('./member')
const OAuth = require('./oauth')
const Pod = require('./pod')
const Squad = require('./squad')
const SquadMember = db.define('squad_member', {})
const Preference = require('./preference')

OAuth.belongsTo(Member)
Member.hasOne(OAuth)
Member.belongsToMany(Squad, {through: SquadMember});
Squad.belongsToMany(Member, {through: SquadMember});
Member.hasMany(Preference);
Pod.hasMany(Preference);

module.exports = {Member, Pod, OAuth, Squad, Preference, SquadMember}
