const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// -desc REG user
// -route POST /api/users
// -access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password){
    res.status(400)
    throw new Error ('Please add all fields.')
  }

  // CHECK IF USER EXISTS
  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error ('User already exists.')
  }

  // HASH PASSWORD WITH BCRYPT
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // CREATE USER
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error ('Invalid user data.')
  }
})

// -desc AUTH user 
// -route POST /api/users/login
// -access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // CHECK FOR USER EMAIL IN DB
  const user = await User.findOne({ email })

  if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid login credentials.')
  }
})


// GENERATE JWT
const generateToken = ( id ) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// -desc GET user data
// -route GET /api/users/me
// -access Private
const getMe = asyncHandler(async (req, res) => {
  // res.status(200).json(req.user)

  const { _id, username, email } = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    username,
    email
  })
})



module.exports = {
  registerUser,
  loginUser,
  getMe,
}