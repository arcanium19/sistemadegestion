const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('Provider', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		contact: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
			validate: {
				isEmail: true
			}
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
	})
}