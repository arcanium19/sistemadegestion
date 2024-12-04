const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { id } = req.params
	const { name, email, contact, address } = req.body

	const provider = await models.Provider.findByPk(id)

	if(!provider) throw new ClientError('No se encontró el proveedor.', 404)

	provider.name = name || provider.name
	provider.email = email || provider.email
	provider.contact = contact || provider.contact
	provider.address = address || provider.address

	const provider_updated = await provider.save()

	if(!provider_updated) throw new ClientError('No se pudo realizar los cambios.', 401)

	response(res, 201, 'El proveedor se actualizó con éxito.')

}