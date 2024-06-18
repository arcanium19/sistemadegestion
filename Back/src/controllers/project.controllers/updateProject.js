const { sequelize, models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const project_id = req.params.id
	const { client_id, estimated_price, final_price, employees, tools } = req.body
	let transaction = await sequelize.transaction()

	if (!project_id) throw new ClientError('ID is missing.', 400)

	const find_project = await models.Project.findByPk(project_id)

	if (!find_project) throw new ClientError('No se encontró el proyecto.', 404)

	find_project.client_id = client_id || find_project.client_id
	find_project.estimated_price = estimated_price || find_project.estimated_price
	find_project.final_price = final_price || find_project.final_price

	await find_project.save({ transaction })

	if (employees && employees.length > 0) {
		const find_all_employees = await models.Employee.findAll({
			where: {
				id: employees
			}
		})

		if (find_all_employees.length !== employees.length) {
			await transaction.rollback()
			throw new ClientError('Uno o mas empleados ya no existen.', 400)
		}

		await find_project.setEmployees(find_all_employees, { transaction })
	}

	if (tools && tools.length > 0) {
		const find_all_tools = await models.Tool.findAll({
			where: {
				id: tools
			}
		})

		if (find_all_tools.length !== tools.length) {
			await transaction.rollback()
			throw new ClientError('Una o mas herramientas ya no existen.', 400)
		}

		await find_project.setTools(find_all_tools, { transaction })
	}

	response(res, 201, 'El proyecto fue actualizado con éxito.')
}