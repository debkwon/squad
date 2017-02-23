'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Squad = db.define('squads', {
  goals: {
    type: Sequelize.STRING
  }

})

module.exports = Squad;
