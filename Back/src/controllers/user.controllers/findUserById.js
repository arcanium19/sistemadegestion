const { response } = require('../../utils')
const { models } = require('../../config/user_foundbase')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
    const { id } =  req.params
    const user_found = await models.User.findByPk(id, {
        attributes: { exclude: ['password'] }
    })

    if(!user_found) throw new ClientError('No se encontraron usuarios.', 404)
    response(res, 201, user_found)
}