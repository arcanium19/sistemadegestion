const { Router } = require('express')
const controllers = require('../controllers')
const middlewares = require('../middlewares')

const user_routes = Router()

user_routes.get('/', middlewares.token, controllers.user.getAllUser)
user_routes.get('/:id', middlewares.token, middlewares.uuidValidator, controllers.user.getUserById)
user_routes.post('/', controllers.user.createUser)
user_routes.post('/login', controllers.user.loginUser)
user_routes.post('/auth/google', controllers.user.loginGoogleUser)
user_routes.put('/:id', middlewares.token, middlewares.uuidValidator, controllers.user.updateUser)
user_routes.delete('/:id', middlewares.token, middlewares.uuidValidator, controllers.user.deleteUser)

module.exports = user_routes