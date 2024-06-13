const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const employee_id = req.params.id

	const employee = await models.Employee.findByPk(employee_id, {
		include: [{
			model: models.Project,
			through: 'ProjectEmployees'
		}]
	})

	if (!employee) throw new ClientError('No se encontró el empleado.', 404)

	response(res, 201, employee)
}