const { Router } = require('express')
const controllers = require('../controllers')
const middlewares = require('../middlewares')

const user_router = Router()

user_router.get('/', middlewares.token, controllers.user.getAllUser)
user_router.get('/:id', middlewares.token, controllers.user.getUserById)
user_router.post('/', controllers.user.createUser)
user_router.post('/login', controllers.user.loginUser)
user_router.put('/:id', middlewares.token, controllers.user.updateUser)
user_router.delete('/:id', middlewares.token, controllers.user.deleteUser)

module.exports = user_router