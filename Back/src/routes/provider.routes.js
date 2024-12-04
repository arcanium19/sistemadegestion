const { Router } = require('express')
const controllers = require('../controllers')

const provider_routes = Router()

provider_routes.get('/', controllers.provider.getAllProvider)
provider_routes.get('/:id', controllers.provider.getProviderById)
provider_routes.post('/', controllers.provider.createProvider)
provider_routes.put('/:id', controllers.provider.updateProvider)
provider_routes.delete('/:id', controllers.provider.deleteProvider)

module.exports = provider_routes