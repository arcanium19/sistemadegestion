const { Router } = require('express')
const user_routes = require('./user.routes')
const client_routes = require('./client.routes')
const employee_routes = require('./employee.routes')
const project_routes = require('./project.routes')
const main_routes = Router()

main_routes.get('/', (req, res) => {
	res.status(200).send('Bienvenido!!!')
})

main_routes.use('/client', client_routes)
main_routes.use('/employee', employee_routes)
main_routes.use('/project', project_routes)
main_routes.use('/user', user_routes)

module.exports = main_routes