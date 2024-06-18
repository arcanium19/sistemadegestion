const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.export = async (req, res) => {
	const all_materials = await models.MaterialStock.findAll()

	if(!all_materials) throw new ClientError('No se encontraron los materiales.', 404)

	response(res, 201, all_materials)
}