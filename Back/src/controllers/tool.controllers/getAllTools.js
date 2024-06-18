const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const all_tools = await models.Tool.findAll({
		include: [{
			model: models.Project,
			through: {
				attributes: []
			}
		}]
	})

	if (!all_tools) throw new ClientError('No se encontraron herramientas', 404)

	response(res, 201, all_tools)
}