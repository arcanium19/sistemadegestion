const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const { name, type, description, quantity } = req.body

	if (!name || name === '') throw new ClientError('Debe completar el nombre.', 400)
	if (!type || type === '') throw new ClientError('Debe completar el nombre.', 400)
	if (!quantity || quantity === '') throw new ClientError('Debe completar el nombre.', 400)


	const new_tool = await models.Tool.create({
		name,
		type,
		description,
		quantity
	})

	if(!new_tool) throw new ClientError('No se pudo crear la herramienta.', 400)
	
	response(res, 201, 'Herramienta creada con éxito.')
}