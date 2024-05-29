const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/errors')

module.exports = (req, res, next) => {
	const token = req.headers.authorization

	if (!token) {
		throw new ClientError('Token de autenticación no proporcionado.', 401)
	}

	try {
		const decoded = jwt.verify(token.split(' ')[1], 'secreto')
		req.userId = decoded.userId
		next()
	} catch (error) {
		throw new ClientError('Token de autenticación inválido.', 401)
	}
}
