const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const tool_id = req.params.id

	const { name, type, description, quantity } = req.body

	if(!tool_id) throw new ClientError('ID is missing.', 400)

	const find_tool = await models.Tool.findByPk(tool_id)

	if(!find_tool) throw new ClientError('No se encontró la herramienta.', 404)

	find_tool.name = name || find_tool.name
	find_tool.type = type || find_tool.type
	find_tool.description = description || find_tool.description
	find_tool.quantity = quantity || find_tool.quantity

	const update_tool = await find_tool.save()

	if(!update_tool) throw new ClientError('No se pudo actualizar la herramienta.', 400)

	response(res, 201, 'Herramienta actualizada con éxito.')
}