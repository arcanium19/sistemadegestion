const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('Employee', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		hourly_rate: {
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	})
}
