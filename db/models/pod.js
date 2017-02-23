'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Pod = db.define('pods', {
  name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  leaderId: {
    type: Sequelize.INTEGER
  },
  members: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  leaderId: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  squads: {
     type: Sequelize.ARRAY(Sequelize.INTEGER),
     defaultValue: []
  }

});

module.exports = Pod;
