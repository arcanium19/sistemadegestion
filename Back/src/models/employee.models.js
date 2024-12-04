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
		email:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		hourly_wage: {
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	})
}
