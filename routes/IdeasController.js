const express = require('express')
const router = express.Router({mergeParams: true})
const { User, Idea } = require('../db/schema')

router.post('/', async (req, res) => {
  // Create an empty Idea model
  // The default values will take over for title & description
  const newIdea = new Idea()

  // Find the user coming from the route
  const user = await User.findById(req.params.userId)
  // Push the new idea into the user's list of ideas
  user.ideas.push(newIdea)
  // Save the updated user to the database
  const saved = await user.save()
  // Send the user object back to React
  res.json(saved)
})

router.patch('/:id', async (req, res) => {
  // Get the values of the updated idea title and description
  const updatedIdea = req.body.idea
  // Find the user
  const user = await User.findById(req.params.userId)
  // Grab the specific idea from the user's ideas
  const idea = user.ideas.id(req.params.id)
  // Update the title and description with the values coming in from the req.body
  idea.title = updatedIdea.title
  idea.description = updatedIdea.description
  // Save the user object
  const saved = await user.save()
  // Send the updated user.
  res.json(saved)
})

router.delete('/:id', async (req, res) => {
  // Find the user
  const user = await User.findById(req.params.userId)
  // Find the specific idea and remove it from the array
  user.ideas.id(req.params.id).remove()
  // Save the updated user
  const saved = await user.save()
  // Send the user object
  res.json(saved)
})

module.exports = router
