const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const { name, hourly_wage } = req.body

	const new_employee = await models.Employee.create({
		name,
		hourly_wage,
	})

	if(!new_employee) throw new ClientError('No se pudo crear el empleado', 400)

	response(res, 201, 'Empleado creado con éxito.')
}