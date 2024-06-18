const { models } = require("../../config/database");
const { response } = require("../../utils");
const { ClientError } = require("../../utils/errors");
const { Op } = require('sequelize');

module.exports = async (req, res) => {
	const { name } = req.query;

	// Validación de entrada
	if (!name || typeof name !== 'string' || name.trim() === '') {
		throw new ClientError('Ingrese un nombre válido.', 400);
	}

	const searchName = name.trim().toLowerCase();

	// Paginación
	const limit = parseInt(req.query.limit, 10) || 10;
	const offset = (parseInt(req.query.page, 10) - 1) * limit || 0;


	const { count, rows } = await models.MaterialStock.findAndCountAll({
		where: {
			name: {
				[Op.iLike]: `%${searchName}%`
			}
		},
		limit,
		offset
	});

	if (rows.length === 0) {
		throw new ClientError('No se encontraron materiales con ese nombre.', 404);
	}

	// Respuesta estructurada
	response(res, 200, {
		data: rows,
		pagination: {
			total: count,
			limit,
			offset
		}
	});
};
