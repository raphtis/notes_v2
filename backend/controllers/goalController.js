const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// -desc GET goals
// -route GET /api/goals
// -access Private

const getGoals = asyncHandler(async (req,res) => {
  res.status(200).json('Connected')
})


module.exports = {
  getGoals,
}