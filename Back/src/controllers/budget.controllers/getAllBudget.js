const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const offset = (page - 1) * limit

	const { count, rows } = await models.Budget.findAndCountAll({
		limit,
		offset,
		attributes: {
			exclude: ["client_id"]
		},
		include: [
			{
				model: models.Client, // Relación con el cliente
				as: 'client',         // Alias definido en los modelos
				attributes: ['id', 'name', 'contact', 'address'], // Atributos específicos del cliente
			},
			{
				model: models.Material, // Relación con los materiales
				as: 'materials',        // Alias definido en los modelos
				attributes: ['id', 'name', 'provider', 'quantity', 'unit_price', 'total'], // Atributos de los materiales
			},
		],
	})

	if (!rows) throw new ClientError('Ocurrió un error, intentelo de nuevo.', 400)

	const totalPages = Math.ceil(count / limit)

	response(res, 200, {
		totalItems: count,
		totalPages,
		currentPage: page,
		budgets: rows,
	})
}
