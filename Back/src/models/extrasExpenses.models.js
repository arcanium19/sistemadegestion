const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define("Extra_Expense", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		cost: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		project_id: {
			type: DataTypes.UUID,
			references: {
				model: 'Projects',
				key: 'id',
			},
		},
	})
}