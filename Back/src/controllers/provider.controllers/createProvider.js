const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
 
module.exports = async (req, res) => {
	const { name, contact, email, address } = req.body
	if(name && name === '' || !name) throw new ClientError('Necesita asignar un nombre.', 400)

	const new_provider = await models.Provider.create({
		name,
		contact,
		email,
		address
	})

	if(!new_provider) throw new ClientError('No se pudo crear el proveedor.', 400)
	
	response(res, 201, `Se creo exitosamente el proveedor ${new_provider.name}`)
}