const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
const { models } = require('../../config/database')

module.export = async (req, res) => {
	const stock_id = req.params.id 

	if(!stock_id) throw new ClientError('ID is missing.', 400)

	const find_material = await models.MaterialStock.findByPk(stock_id)

	if(!find_material) throw new ClientError('No se encontró el material.', 404)

	response(res, 201, find_material)
}