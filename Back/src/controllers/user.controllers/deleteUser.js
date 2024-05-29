const ClientError = require('../../utils/errors')
const { models } = require('../../config/database')
const { response } = require('../../utils')

module.exports = async (req, res) => {
	const { id } = req.params
    
	if (!id) throw new ClientError('ID is missing', 401)
    
	const user_found = await models.User.findByPk(id)
    
	if(!user_found) throw new ClientError('No se encontró el usuario.', 404)

	await user_found.destroy()
	response(res, 201, 'El usuario ha sido eliminado.')
}