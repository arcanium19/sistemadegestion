const { models } = require("../../config/database")
const { response } = require("../../utils")
const { ClientError } = require("../../utils/errors")

module.exports = async (req, res) => {
	const budget_id = req.params.id

	const delete_budget = await models.Budget.findByPk(budget_id)

	if (!delete_budget) throw new ClientError("No se encontró el presupuesto.", 404)

	await delete_budget.destroy()

	response(res, 200, "Se eliminó el presupuesto con éxito.")
}