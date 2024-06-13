const { models } = require('../../config/database')
const { response } = require('../../utils')

module.exports = async (req, res) => {
	const all_projects = await models.Project.findAll({
		include: [
			{
				model: models.Employee,
				through: {
					attributes: [] // Esto omite los atributos de la tabla intermedia
				},
			},
			{
				model: models.Tool,
				through: {
					attributes: [] // Esto omite los atributos de la tabla intermedia
				},
			},
		],
	})

	response(res, 201, all_projects)
}