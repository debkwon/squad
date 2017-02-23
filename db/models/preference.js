'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db')

const Preference = db.define('preferences', {
  preferences: {
    type: Sequelize.TEXT,
    get: function() {
      return JSON.parse(this.getDataValue('preferences'));
    },
    set: function(value) {
      return this.setDataValue('preferences', JSON.stringify(value));
    }
  }
})

module.exports = Preference;
