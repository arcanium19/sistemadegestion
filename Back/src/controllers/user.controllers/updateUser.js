// const { response } = require('../../utils')
// const { models } = require('../../config/database')
// const { ClientError } = require('../../utils/errors')
// const bcrypt = require('bcryptjs')

// module.exports = async (req, res) => {
//     const { id } =  req.params
//     const { name, lastname, email, password } = req.body

//     if(!name && !lastname && !email && !password) throw new ClientError('Debe ingresar un dato a actualizar', 400)

//     const user_found = await models.User.findByPk(id)

//     if(!user_found) throw new ClientError('No se encontró el usuario.', 404)

//     const update_data = {}

//     if(name) update_data.name = name
//     if(lastname) update_data.lastname = lastname
//     if(email) update_data.email = email
//     if(password) {
//         const password_hashed = await bcrypt.hash(password, 10)
//         update_data.password = password_hashed
//     }

//     const data_updated = await models.User.update(update_data)

//     if(!data_updated) throw new ClientError('No se pudo actualizar el usuario.', 401)
//     response(res, 201, 'Se ha actualizado el usuario.')
// }

const { response } = require('../../utils')
const { models } = require('../../config/database')
const { ClientError } = require('../../utils/errors')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
	const { id } =  req.params
	const { name, last_name, email, password } = req.body
	const user_found = await models.User.findByPk(id)

	if (!user_found) {
		throw new ClientError('Usuario no encontrado', 404)
	}

	user_found.name = name || user_found.name
	user_found.last_name = last_name || user_found.last_name
	user_found.email = email || user_found.email
	if(password){
		const password_hashed = await bcrypt.hash(password, 10)
		user_found.password = password_hashed
	}

	const user_updated = await user_found.save()
	if(!user_updated) throw new ClientError('No se pudo actualizar el usuario', 400)
	response(res, 201, 'Usuario actualizado con éxito.')
}