const express = require('express')
const router = express.Router({mergeParams: true})
const { User, Idea } = require('../db/schema')

router.post('/', async (req, res) => {
  const newIdea = new Idea()
  const user = await User.findById(req.params.userId)
  user.ideas.push(newIdea)
  const saved = await user.save()
  res.json(saved)
})

router.patch('/:id', async (req, res) => {
  const updatedIdea = req.body.idea
  const user = await User.findById(req.params.userId)
  const idea = user.ideas.id(req.params.id)
  idea.title = updatedIdea.title
  idea.description = updatedIdea.description
  const saved = await user.save()
  res.json(saved)
})

router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.userId)
  user.ideas.id(req.params.id).remove()
  const saved = await user.save()
  res.json(saved)
})

module.exports = router
