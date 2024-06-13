const { Router } = require('express')
const controllers = require('../controllers')
const middlewares = require('../middlewares')

const client_routes = Router()

client_routes.get('/', controllers.client.getAllClient)
client_routes.get('/:id', middlewares.uuidValidator, controllers.client.getClientById)
client_routes.post('/', controllers.client.createClient)
client_routes.delete('/:id', middlewares.uuidValidator, controllers.client.deleteClient)
client_routes.put('/:id', middlewares.uuidValidator, controllers.client.updateClient)

module.exports = client_routes