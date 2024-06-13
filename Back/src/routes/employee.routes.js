const { Router } = require('express')
const controllers = require('../controllers')

const employee_routes = Router()

employee_routes.get('/', controllers.employee.getAllEmployee)
employee_routes.get('/:id', controllers.employee.getEmployeeById)
employee_routes.post('/', controllers.employee.createEmployee)
employee_routes.put('/:id', controllers.employee.updateEmployee)
employee_routes.delete('/:id', controllers.employee.deleteEmployee)

module.exports = employee_routes