const { ClientError } = require('../utils/errors')

module.exports = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err)
	}

	if (err instanceof ClientError) {
		console.log('Client Error Messagge:', err.message)
		return res.status(err.statusCode).json({
			error: true,
			message: err.message
		})
	}
	
	console.log('Error:', err.message)
	res.status(500).json({
		error: true,
		message: 'Ocurrió un problema inesperado, intentelo nuevamente.'
	})
}
