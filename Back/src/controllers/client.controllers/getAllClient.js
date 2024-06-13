const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const clients = await models.Client.findAll()

	if(!clients) throw new ClientError('Ocurrio un error, intentelo de nuevo.', 400)
		
	response(res, 201, clients)
}