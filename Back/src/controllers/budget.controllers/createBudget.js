const { models, sequelize } = require('../../config/database')
const { ClientError } = require('../../utils/errors')
const { response } = require('../../utils')

module.exports = async (req, res) => {
	const {
		name,
		client_id,
		location,
		work_type,
		objective,
		finish_details,
		observations,
		accessories,
		extra_details,
		estimated_price,
		materials,
	} = req.body

	const transaction = await sequelize.transaction()

	const budget = await models.Budget.create({
		name,
		client_id,
		location,
		work_type,
		objective,
		finish_details,
		observations,
		accessories,
		extra_details,
		estimated_price,
	}, { transaction })

	if (!budget) {
		await transaction.rollback();
		throw new ClientError("Algunos datos son incorrectos, inténtelo de nuevo", 400)
	}

	const client_found = await models.Client.findByPk(client_id, { transaction })

	if (!client_found) {
		await transaction.rollback()
		throw new ClientError("No se encontró el cliente", 404)
	}

	//linking client id

	await budget.setClient(client_found, { transaction })

	//creating materials

	if (materials) {
		// Verificar si materials es un array válido
		if (!Array.isArray(materials) || materials.length <= 0) {
			await transaction.rollback();
			throw new ClientError("Lista de materiales dañada, creala de nuevo", 400);
		} else {
			// Mapear y crear materiales usando Promise.all
			const materials_created = await Promise.all(
				materials.map(async (material) => {
					const { name, provider, quantity, unit_price, total } = material;

					// Validar los campos del material
					if (!name || !provider || !quantity || !unit_price || !total) {
						throw new ClientError(
							`Material incompleto. Faltan campos: ${JSON.stringify(material)}`,
							400
						);
					}

					// Crear material en la base de datos
					return await models.Material.create(material,
						{ transaction }
					);
				})
			);
			await budget.addMaterials(materials_created, { transaction })
		}
	}


	await transaction.commit()
	response(res, 201, `Se creo el presupuesto ${budget.dataValues.name}`)
}