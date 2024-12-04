const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const offset = (page - 1) * limit

	const { count, rows } = await models.Provider.findAndCountAll({
		limit,
		offset,
	})

	if (!rows) throw new ClientError('Ocurrió un error, intentelo de nuevo.', 400)

	const totalPages = Math.ceil(count / limit)

	response(res, 200, {
		totalItems: count,
		totalPages,
		currentPage: page,
		providers: rows,
	})
}
