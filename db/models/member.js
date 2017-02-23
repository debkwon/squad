'use strict'

const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Member = db.define('members', {
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		},
    unique: true
  },
  pods: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  isLeader: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL
}, {
  indexes: [{fields: ['email'], unique: true,}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

function setEmailAndPassword(member) {
  member.email = member.email && member.email.toLowerCase()
  if (!member.password) return Promise.resolve(member)

  return new Promise((resolve, reject) =>
    //'.hash' salts password and sets password as the password_digest in the db as long as there's no error
	  bcrypt.hash(member.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  member.set('password_digest', hash)
      resolve(member)
	  })
  )
}

module.exports = Member;
