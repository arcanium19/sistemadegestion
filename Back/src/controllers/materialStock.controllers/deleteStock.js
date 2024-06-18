const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const stock_id = req.params.id 

	if(!stock_id) throw new ClientError('ID is missing.', 400)

	const find_stock = await models.MaterialStock.findByPk(stock_id)

	if(!find_stock) throw new ClientError('No se pudo encontrar el material.', 404)

	const delete_material = await find_stock.destroy()

	if(!delete_material) throw new ClientError('No se pudo eliminar el material.', 400)

	response(res, 201, 'Se eliminó el material con éxito.')
}