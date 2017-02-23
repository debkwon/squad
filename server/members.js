'use strict'

const db = require('APP/db')
const Member = db.model('members')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list members'), (req, res, next) =>
		Member.findAll()
		.then(members => res.json(members))
		.catch(next))
	.post('/', (req, res, next) =>
		Member.create(req.body)
		.then(member => res.status(201).json(member))
		.catch(next))
	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		Member.findById(req.params.id)
		.then(member => res.json(member))
		.catch(next))
