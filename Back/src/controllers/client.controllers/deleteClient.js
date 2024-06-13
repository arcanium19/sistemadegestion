const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { id } = req.params
	
	const client = await models.Client.findByPk(id)

	if(!client) throw new ClientError('No se encontró el cliente.', 404)

	await client.destroy()

	response(res, 201, 'El cliente se eliminó con éxito.')
}