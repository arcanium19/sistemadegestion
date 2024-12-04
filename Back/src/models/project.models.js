const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	return sequelize.define('Project', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		budget_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Budgets',
				key: 'id',
			},
		},
		client_id: {
			type: DataTypes.UUID,
			references: {
				model: 'Clients',
				key: 'id',
			}
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM(
				"planned",
				"active",
				"on_hold",
				"completed",
				"canceled",
				"pending",
				"in_review",
				"delayed"
			),
			defaultValue: "planned",
			allowNull: false,
		},
	});
}
