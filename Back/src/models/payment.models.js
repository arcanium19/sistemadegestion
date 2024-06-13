const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('Payment', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('entrante', 'saliente'),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	})
}
