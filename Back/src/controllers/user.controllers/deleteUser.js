const { ClientError } = require('../../utils/errors')
const { models } = require('../../config/database')
const { response } = require('../../utils')

module.exports = async (req, res) => {
	const { id } = req.params

	if (!id) throw new ClientError('ID is missing', 400)

	const user_found = await models.User.findByPk(id)

	if (!user_found) throw new ClientError('Usuario no encontrado.', 404)

	await user_found.destroy()
	response(res, 201, 'El usuario ha sido eliminado.')
}