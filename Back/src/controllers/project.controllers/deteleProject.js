const { models } = require('../../config/database')
const { response } = require('../../utils')
const { ClientError } = require('../../utils/errors')

module.exports = async (req, res) => {
	const project_id = req.params.id
	const delete_project = await models.Project.findByPk(project_id)

	if(!delete_project) throw new ClientError('No se encontró el proyecto.', 404)

	await delete_project.destroy()

	response(res, 201, 'El proyecto se eliminó con éxito.')
}