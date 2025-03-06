const { models } = require('../../config/database');
const { ClientError } = require('../../utils/errors');
const { response } = require('../../utils');

module.exports = async (req, res) => {
	const { id } = req.params;

	const budget = await models.Budget.findByPk(id, {
		attributes: {
			exclude: ["client_id"]
		},
		include: [
			{
				model: models.Client, // Relación con el cliente
				as: 'client',         // Alias definido en los modelos
				attributes: ['id', 'name', 'contact', 'address'], // Atributos específicos del cliente
			},
			{
				model: models.Material, // Relación con los materiales
				as: 'materials',        // Alias definido en los modelos
				attributes: ['id', 'name', 'provider', 'quantity', 'unit_price', 'observations', 'total'], // Atributos de los materiales
			},
		],
	});

	if (!budget) {
		throw new ClientError('Presupuesto no encontrado', 404);
	}

	response(res, 200, budget);
};
