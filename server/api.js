'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .use('/auth', require('./auth'))
  .use('/pod', require('./pod'))
  .use('/members', require('./members'))
  .use('/preferences', require('./preferences'))


// No routes matched? 404.
api.use((req, res) => res.status(404).end())
