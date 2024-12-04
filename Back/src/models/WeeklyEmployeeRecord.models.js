const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define("WeeklyEmployeeRecord", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		project_id: {
			type: DataTypes.UUID,
			references: {
				model: 'Projects',
				key: 'id',
			},
		},
		employee_id: {
			type: DataTypes.UUID,
			references: {
				model: 'Employees',
				key: 'id',
			},
		},
		week: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		monday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		tuesday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		wednesday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		thursday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		friday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		saturday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		hourly_cost: {
			type: DataTypes.DECIMAL(10, 2),
			reference: {
				model: "Employees",
				key: "id"
			}
		},
		total_hours: {
			type: DataTypes.VIRTUAL,
			get() {
				return (
					this.getDataValue('monday') +
					this.getDataValue('tuesday') +
					this.getDataValue('wednesday') +
					this.getDataValue('thursday') +
					this.getDataValue('friday') +
					this.getDataValue('saturday')
				);
			},
		},
		weekly_total_cost: {
			type: DataTypes.VIRTUAL,
			get() {
				return this.getDataValue('total_hours') * this.getDataValue('hourly_cost');
			},
		},
	})
}