const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')
const { models } = require('../../config/database')

module.export = async (req, res) => {
	const { name, unit, quantity, price, code } = req.body

	if (!name || name === '') throw new ClientError('Debe ingresar un nombre.', 400)
	if (!unit || unit === '') throw new ClientError('Debe elegir una unidad de medida.', 400)
	if (!quantity || quantity === '') throw new ClientError('Ingrese la cantidad del stock.', 400)
	if (!price || price === '') throw new ClientError('Ingrese un precio por unidad de medida.', 400)
	if (!code || code === '') throw new ClientError('Ingrese un código de identificacion.', 400)

	const code_is_used = await models.MaterialStock.findOne({
		where: {
			code: code
		}
	})

	if (code_is_used) throw new ClientError('El código ya está en uso.', 400)

	const name_is_used = await models.MaterialStock.findOne({
		where: {
			name: name
		}
	})

	if (name_is_used) throw new ClientError('El nombre ya está en uso.', 400)

	const new_stock = await models.MaterialStock.create({
		name,
		unit,
		quantity,
		price,
		code
	})

	if (!new_stock) throw new ClientError('No se pudo crear, intentelo nuevamente.', 400)

	response(res, 201, 'Se creó el stock con éxito.')

}