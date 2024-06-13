const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
 
module.exports = async (req, res) => {
	const { name, contact, email } = req.body
	if(name && name === '' || !name) throw new ClientError('Necesita asignar un nombre.', 400)

	const new_client = await models.Client.create({
		name,
		contact,
		email
	})

	if(!new_client) throw new ClientError('No se pudo crear el cliente.', 400)
	
	response(res, 201, `Se creo exitosamente a ${new_client.name}`)
}