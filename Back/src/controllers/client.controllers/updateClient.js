const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { id } = req.params
	const { name, email, contact } = req.body

	const client = await models.Client.findByPk(id)

	if(!client) throw new ClientError('No se encontró el cliente.', 404)

	client.name = name || client.name
	client.email = email || client.email
	client.contact = contact || client.contact

	const client_updated = await client.save()

	if(!client_updated) throw new ClientError('No se pudo realizar los cambios.', 401)

	response(res, 201, 'El cliente se actualizó con éxito.')

}