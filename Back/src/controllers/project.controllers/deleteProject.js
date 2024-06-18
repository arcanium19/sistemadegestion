const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const project_id = req.params.id 

	if(!project_id) throw new ClientError('ID is missing.', 400)

	const find_project = await models.Project.findByPk(project_id)

	if(!find_project) throw new ClientError('No se encontró el proyecto.', 404)
	
	const deleted_project = await find_project.destroy()

	if(!deleted_project) throw new ClientError('No se pudo eliminar el proyecto.', 400)

	response(res, 201, 'El proyecto fue eliminado con éxito.')
}