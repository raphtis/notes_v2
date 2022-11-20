const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// -desc GET goals
// -route GET /api/goals
// -access Private
const getGoals = asyncHandler(async (req,res) => {
  const goals = await Goal.find({ username: req.user.id })
  res.status(200).json(goals)
})

// -desc GET goals
// -route GET /api/goals
// -access Private
const getGoal = asyncHandler(async (req,res) => {
  const goal = await Goal.findById(req.params.id)

  // DOES GOAL EXIST
  if(!goal){
    res.status(400)
    throw new Error('Goal could not be found.')
  }

  // DID USER CREATE GOAL
  if(!req.user){
    res.status(401)
    throw new Error('User not found.')
  }

  res.status(200).json(goal)
})


// -desc CREATE goal
// -route POST /api/goals
// -access Private
const createGoal = asyncHandler(async (req,res) => {
  // validation 
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field.')
  }

  const goal = await Goal.create({
    title: req.body.title,
    text: req.body.text,
    username: req.user.id
  })

  res.status(200).json(goal)
})

// -desc UPDATE goals
// -route PUT /api/goals/:id
// -access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal could not be found.')
  }

  // DOES USER EXIST
  if(!req.user){
    res.status(401)
    throw new Error('User not found.')
  }

  // DID LOGGED USER CREATE POST
  if(goal.username.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized.')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

  res.status(200).json(updatedGoal)
})

// -desc DELETE goals
// -route DELETE /api/goals/:id
// -access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal not found.')
  }

  // DOES USER EXIST
  if(!req.user){
    res.status(401)
    throw new Error('User not found.')
  }

  // DID LOGGED USER CREATE POST
  if(goal.username.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized.')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal
}