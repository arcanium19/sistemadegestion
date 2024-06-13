const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')


module.exports = async (req, res) => {
	const project_id = req.params.id

	const get_project = await models.Project.findByPk(project_id, 
		{
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
		}
	)

	if (!get_project) throw new ClientError('No se encontró el proyecto.', 404)

	response(res, 201, get_project)
}