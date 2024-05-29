const { response } = require('../../utils')
const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const data = await models.User.findAll({
		attributes: { exclude: ['password'] }
	})

	if(!data) throw new ClientError('No se encontraron usuarios.', 404)
	response(res, 201, data)
}