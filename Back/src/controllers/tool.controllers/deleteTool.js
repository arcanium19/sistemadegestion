const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const tool_id = req.params.id

	if(!tool_id) throw new ClientError('ID is missing.', 400)

	const find_tool = await models.Tool.findByPk(tool_id)

	if(!find_tool) throw new ClientError('Herramienta no encontrada.', 404)

	await find_tool.destroy()

	response(res, 201, 'Herramienta eliminada con éxito.')
}