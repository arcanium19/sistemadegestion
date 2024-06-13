const { DataTypes } = require('sequelize')

//Corregir que tool sea tomado de un modelo, asi tambien como materiales.
module.exports = (sequelize) => {
	return sequelize.define('Project', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		client_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Clients',
				key: 'id'
			}
		},
		estimated_price: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		final_price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		}
	})
}
