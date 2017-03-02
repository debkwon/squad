const Preference = require('APP/db/models/preference');
const preferences = require('express').Router();

preferences.get('/:id', (req,res,next) => {
  Preference.findById(req.params.id)
  .then(pref => res.send(pref))
  .catch(next)
})

preferences.post('/new', (req,res,next) => {
  Preference.create(req.body)
  .then(pref => {
    res.status(201).send(pref)
  })
  .catch(next)
})

preferences.put('/:id', (req,res,next) => {
  Preference.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedPref => res.send(updatedPref))
  .catch(next)
})

preferences.delete('/:id', (req,res,next) => {
  Preference.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(destroyedPref => res.send({message: "Preferences have been deleted"}))
  .catch(next)
})

module.exports = preferences
