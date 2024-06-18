const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
const { models } = require('../../config/database')

module.export = async (req, res) => {
	const { code } = req.params.product_code

	if (!code) throw new ClientError('Por favor ingrese un código.', 400)

	const find_material_with_code = await models.MaterialStock.findOne({
		where: {
			code: code
		}
	})

	if (!find_material_with_code) throw new ClientError('Material no encontrado', 404)

	response(res, 201, find_material_with_code)
}