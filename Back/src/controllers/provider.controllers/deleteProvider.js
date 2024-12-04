const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { id } = req.params
	
	const provider = await models.Provider.findByPk(id)

	if(!provider) throw new ClientError('No se encontró el proveedor.', 404)

	await provider.destroy()

	response(res, 201, 'El proveedor se eliminó con éxito.')
}