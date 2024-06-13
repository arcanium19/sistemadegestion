const { Router } = require('express')
const controllers = require('../controllers')

const project_routes = Router()

project_routes.get('/', controllers.project.getAllProject)
project_routes.get('/:id', controllers.project.getProjectById)
project_routes.post('/', controllers.project.createProject)
project_routes.put('/:id', controllers.project.updateProject)
project_routes.delete('/:id', controllers.project.deleteProject)

module.exports = project_routes