const { validate: isUuid } = require('uuid')
const { ClientError } = require('../utils/errors')

const validateUuidMiddleware = (req, res, next) => {
	const { id } = req.params


	if (!isUuid(id)) {
		console.log('DEV Messagge: ID is not an UUID')
		throw new ClientError('No se pudo realizar la consulta.', 401)
	}

	next()
}

module.exports = validateUuidMiddleware
