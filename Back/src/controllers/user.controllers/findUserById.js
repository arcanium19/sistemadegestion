const { response } = require('../../utils')
const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { id } = req.params
    
	const data = await models.User.findByPk(id, {
		attributes: { exclude: ['password'] }
	})

	if(!data) throw new ClientError('Usuario no encontrado.', 404)
	response(res, 201, data)
}