const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define('WorkDay', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		employee_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Employees',
				key: 'id'
			}
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		hours_worked: {
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	})
}
