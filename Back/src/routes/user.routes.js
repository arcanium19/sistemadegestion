const { Router } = require('express')
const controllers = require('../controllers')

const user_router = Router()

user_router.get('/', controllers.user.getAllUser)

module.exports = user_router