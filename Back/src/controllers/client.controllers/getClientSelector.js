const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const client_selector = await models.Client.findAll({
		attributes: ["id", "name"]
	})

	if(!client_selector) throw new ClientError("Error al cargar la lista de clientes")

	response(res, 200, client_selector)
}