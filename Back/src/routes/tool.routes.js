const { Router } = require('express')
const controllers = require('../controllers')

const tool_routes = Router()

tool_routes.get('/', controllers.tool.getAllTool)
tool_routes.get('/:id', controllers.tool.getToolById)
tool_routes.post('/', controllers.tool.createTool)
tool_routes.put('/:id', controllers.tool.updateTool)
tool_routes.delete('/:id', controllers.tool.deleteTool)

module.exports = tool_routes