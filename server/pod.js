const pod = require('express').Router()
const Pod = require('APP/db/models/pod')

pod.get('/:id', (req,res,next) => {
  Pod.findById(req.params.id)
  .then(pod => res.send(pod))
  .catch(next)
})

pod.post('/new', (req,res,next) => {
  Pod.create(req.body)
  .then(pod => {
    res.status(201).send(pod)
  })
  .catch(next)
})

pod.put('/:id', (req,res,next) => {
  Pod.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedPod => res.send(updatedPod))
  .catch(next)
})

pod.delete('/:id', (req,res,next) => {
  Pod.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(destroyedPod => res.send({message: "Pod has been deleted"}))
  .catch(next)
})

module.exports = pod
