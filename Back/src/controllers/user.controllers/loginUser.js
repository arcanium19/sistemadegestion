const { models } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
const { JWT_SECRET } = require('../../config/config')

module.exports = async (req, res) => {
	const { email, password } = req.body

	const user = await models.User.findOne({ where: { email } })
	if (!user) throw new ClientError('Email no encontrado.', 404)

	const validPassword = await bcrypt.compare(password, user.password)
	if (!validPassword) throw new ClientError('Contraseña incorrecta.', 404)

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '12h' })
	if(!token) throw new ClientError('Error al iniciar sesión.', 400)
	response(res, 201, token)
}