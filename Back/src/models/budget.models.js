const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Budget = sequelize.define('Budget', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Clients',
				key: 'id',
			},
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		work_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		objective: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		finish_details: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		observations: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		accessories: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		extra_details: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		estimated_price: {
			type: DataTypes.DECIMAL(10, 2)
		}
	});

	return Budget;
};
