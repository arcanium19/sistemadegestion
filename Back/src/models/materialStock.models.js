const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('MaterialStock', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		unit: {
			type: DataTypes.ENUM('Metros', 'Kg', 'Bolsa', 'unidad'),
			allowNull: false
		},
		quantity: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		code: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			unique: true
		}
	})
}
