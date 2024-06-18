const { models, sequelize } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	let transaction = await sequelize.transaction()

	const { client_id, estimated_price, final_price, employees, tools } = req.body

	if(!client_id || !estimated_price || !employees || !tools) throw new ClientError('Debe completar todos los campos obligatorios', 400)

	if (employees !== undefined && Array.isArray(employees) && employees.length > 0) {
		const employeesExist = await models.Employee.findAll({
			where: {
				id: employees,
			},
		})

		if (employeesExist.length !== employees.length) {
			await transaction.rollback()
			throw new ClientError('Uno o más empleados no existen.', 400)
		}

		const toolsExist = await models.Tool.findAll({
			where: {
				id: tools,
			},
		})

		if (toolsExist.length !== tools.length) {
			await transaction.rollback()
			throw new ClientError('Una o más herramientas no existen.', 400)
		}
	}

	const newProject = await models.Project.create(
		{
			client_id,
			estimated_price,
			final_price,
		},
		{ transaction }
	)

	if (employees !== undefined && Array.isArray(employees) && employees.length > 0) {
		await newProject.setEmployees(employees, { transaction })
		await newProject.setTools(tools, { transaction })
	}

	await transaction.commit()

	response(res, 201, 'Nuevo proyecto creado con éxito.')
}