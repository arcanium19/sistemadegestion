const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/errors')
const { JWT_SECRET } = require('../config/config')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new ClientError('Token de autenticación no proporcionado', 401)
    }
    
    const tokenParts = authHeader.split(' ')
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
        throw new ClientError('Formato de token de autenticación inválido', 401)
    }

    const token = tokenParts[1]
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        throw new ClientError('Token de autenticación inválido', 401)
    }
}
