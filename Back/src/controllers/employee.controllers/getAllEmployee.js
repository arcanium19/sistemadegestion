const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const all_employee = await models.Employee.findAll({
		include: [{
			model: models.Project,
			through: 'ProjectEmployees'
		}]
	})

	if(!all_employee) throw new ClientError('Ocurrio un error intentelo nuevamente.', 400)

	response(res, 201, all_employee)
}