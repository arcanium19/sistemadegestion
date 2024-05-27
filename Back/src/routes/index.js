const { Router } = require('express')
const user_router = require('./user.routes')
const main_routes = Router()

main_routes.get('/', (req, res) => {
	res.status(200).send('Bienvenido!!!')
})

main_routes.use('/user', user_router)

module.exports = main_routes