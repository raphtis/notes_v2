const express = require('express')
const router = express.Router()
const { getGoals } = require('../controllers/goalController')


router.route('/').get(getGoals)


module.exports = router
