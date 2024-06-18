const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const employee_id = req.params.id

	if(!employee_id) throw new ClientError('ID is missing.', 400)
	const delete_employee = await models.Employee.findByPk(employee_id)

	if (!delete_employee) throw new ClientError('No se encontró el empleado.', 404)

	await delete_employee.destroy()

	response(res, 201, 'Se eliminó el empleado con éxito.')
}