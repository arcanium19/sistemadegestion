const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const stock_id = req.params.id
	const { name, unit, quantity, price, code } = req.body

	if(!stock_id) throw new ClientError('ID is missing.', 400)

	const find_material = await models.MaterialStock.findByPk(stock_id)

	if(!find_material) throw new ClientError('No se encontró el material.', 404)
	
	find_material.unit = unit || find_material.unit
	find_material.quantity = quantity || find_material.quantity
	find_material.price = price || find_material.price

	if(name && typeof name === 'string' && name.trim() !== ''){
		const name_is_used = await models.MaterialStock.findOne({
			where: {
				name: name
			}
		})

		if(name_is_used) throw new ClientError('El nombre ya está en uso.', 400)
		
		find_material.name = name
		
	}

	if(code){
		const code_is_used = await models.MaterialStock.findOne({
			where: {
				code: code
			}
		})

		if(code_is_used) throw new ClientError('El código ya está en uso.', 400)
		
		find_material.code = code
	}

	const material_updated = await find_material.save()

	if(!material_updated) throw new ClientError('No se pudo actualizar el material.', 400)

	response(res, 201, 'Se actualizó el material con éxito.')
}