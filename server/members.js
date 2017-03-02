'use strict'

const Member = require('APP/db/models/members')
const members = require('express').Router()

// const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

members.get('/:id', (req,res,next) => {
  Member.findById(req.params.id)
  .then(member => res.send(member))
  .catch(next)
})

members.post('/new', (req,res,next) => {
  Member.create(req.body)
  .then(member => {
    res.status(201).send(member)
  })
  .catch(next)
})

members.put('/:id', (req,res,next) => {
  Member.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedMember => res.send(updatedMember))
  .catch(next)
})

members.delete('/:id', (req,res,next) => {
  Member.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(destroyedMember => res.send({message: "Member has been deleted"}))
  .catch(next)
})

module.exports = members
// module.exports = require('express').Router()
// 	.get('/', forbidden('only admins can list members'), (req, res, next) =>
// 		Member.findAll()
// 		.then(members => res.json(members))
// 		.catch(next))
// 	.post('/', (req, res, next) =>
// 		Member.create(req.body)
// 		.then(member => res.status(201).json(member))
// 		.catch(next))
// 	.get('/:id', mustBeLoggedIn, (req, res, next) =>
// 		Member.findById(req.params.id)
// 		.then(member => res.json(member))
// 		.catch(next))
