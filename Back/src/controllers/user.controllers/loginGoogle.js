const { models } = require('../../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
const { JWT_SECRET } = require('../../config/config')

module.exports = async (req, res) => {
	const { email, name, last_name, password } = req.body
	console.log('email: ', email)
	if(!email || !name || !last_name || !password) throw new ClientError('Datos faltantes', 400)

	let user = await models.User.findOne({ where: { email } })
	if (!user) {
		const password_hashed = await bcrypt.hash(password, 10)
		user = await models.User.create({ email, name, last_name, password: password_hashed })
	}
	if(!user) throw new ClientError('No se pudo crear el usuario en la DB', 400)
	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '12h' })

	response(res, 201, token)
}