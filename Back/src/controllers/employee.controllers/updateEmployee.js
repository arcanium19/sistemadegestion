const { models, sequelize } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const employee_id = req.params.id
	const { name, hourly_rate, projects } = req.body
	let transaction = sequelize.transaction()

	const find_employee = await models.Employee.findByPk(employee_id, { transaction })

	if (!find_employee) throw new ClientError('No se encontró el empleado.', 404)

	find_employee.name = name || find_employee.name
	find_employee.hourly_rate = hourly_rate || find_employee.hourly_rate

	await find_employee.save({ transaction })

	if (projects && projects.length > 0) {
		const find_all_projects = await models.Project.findAll({
			where: {
				id: projects
			}
		})

		if (find_all_projects.length !== projects.length) {
			await transaction.rollback()
			throw new ClientError('Uno o mas proyectos ya no exiten', 400)
		}

		await employee_is_updating.setProjects(find_all_projects, { transaction })
	}

	await transaction.commit()

	response(res, 201, 'El empleado se actualizó con éxito.')



}