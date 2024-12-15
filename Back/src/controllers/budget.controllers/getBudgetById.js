const { models } = require('../../config/database');
const { ClientError } = require('../../utils/errors');
const { response } = require('../../utils');

module.exports = async (req, res) => {
  const { id } = req.params; // ID del presupuesto

  // Buscar el presupuesto por su ID, incluyendo las relaciones necesarias
  const budget = await models.Budget.findByPk(id, {
    include: [
      {
        model: models.Client, // Relación con el cliente
        as: 'Client', // Alias definido en la asociación
        attributes: ['id', 'name', 'email', 'phone'], // Campos que deseas incluir del cliente
      },
      {
        model: models.Material, // Relación con los materiales
        as: 'Materials', // Alias definido en la asociación
        attributes: ['id', 'name', 'provider', 'quantity', 'unit_price', 'total'], // Campos de materiales
      },
    ],
  });

  // Verificar si el presupuesto existe
  if (!budget) {
    throw new ClientError('Presupuesto no encontrado', 404);
  }

  // Responder con el presupuesto y sus relaciones
  response(res, 200, budget);
};
