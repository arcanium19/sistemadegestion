const { Router } = require('express')
const controllers = require('../controllers')
const middlewares = require('../middlewares')

const budget_routes = Router()

budget_routes.get('/', controllers.budget.getAllBudget)
budget_routes.get('/:id', middlewares.uuidValidator, controllers.budget.getBudgetById)
budget_routes.post('/', controllers.budget.createBudget)
budget_routes.delete('/:id', middlewares.uuidValidator, controllers.budget.deleteBudget)
budget_routes.put('/:id', middlewares.uuidValidator, controllers.client.updateClient)

module.exports = budget_routes