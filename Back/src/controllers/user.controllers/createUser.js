const { response } = require('../../utils')
const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {

	const { name, last_name, email, password } = req.body

	const user_found = await models.User.findOne({ where: { email: email } })

	if(user_found) throw new ClientError('El email ya se encuentra en uso', 401)

	const password_hashed = await bcrypt.hash(password, 10)

	const create_user = await models.User.create({
		name,
		last_name,
		email, 
		password: password_hashed,
	})

	if(!create_user) throw new ClientError('No se pudo crear el usuario.', 404)
        
	response(res, 201, 'Usuario creado con éxito')
}