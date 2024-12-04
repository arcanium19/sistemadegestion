const { Sequelize } = require('sequelize')

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_INTERFACE, DB_USER } = require('./config')

const sequelize = new Sequelize(`${DB_INTERFACE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false,
	native: false
})

const Client = require('../models/client.models')(sequelize)
const Employee = require('../models/employee.models')(sequelize)
const Estimate = require('../models/estimate.models')(sequelize)
const ExtraExpense = require('../models/extrasExpenses.models')(sequelize)
const MaterialStock = require('../models/materialStock.models')(sequelize)
const Payment = require('../models/payment.models')(sequelize)
const Project = require('../models/project.models')(sequelize)
const Provider = require('../models/provider.models')(sequelize)
const Tool = require('../models/tool.models')(sequelize)
const User = require('../models/user.models')(sequelize)
const WeeklyEmployeeRecord = require('../models/WeeklyEmployeeRecord.models')(sequelize)
const WorkDay = require('../models/workday.models')(sequelize)

Client.hasMany(Project, { foreignKey: 'client_id' })
Project.belongsTo(Client, { foreignKey: 'client_id' })

Employee.belongsToMany(WorkDay, { through: 'EmployeeWorkday' })
WorkDay.belongsToMany(Employee, { through: 'EmployeeWorkday' })


Project.belongsToMany(Employee, { through: 'ProjectEmployees' })
Employee.belongsToMany(Project, { through: 'ProjectEmployees' })

Project.belongsToMany(MaterialStock, { through: 'ProjectMaterials' })
MaterialStock.belongsToMany(Project, { through: 'ProjectMaterials' })

Estimate.belongsToMany(MaterialStock, { through: 'EstimateMaterials' })
MaterialStock.belongsToMany(Estimate, { through: 'EstimateMaterials' })

Project.belongsToMany(Tool, { through: 'ProjectTool' })
Tool.belongsToMany(Project, { through: 'ProjectTool' })

Project.hasMany(ExtraExpense, { foreignKey: 'project_id' });
ExtraExpense.belongsTo(Project, { foreignKey: 'project_id' });

Project.hasMany(WeeklyEmployeeRecord, { foreignKey: 'project_id' });
WeeklyEmployeeRecord.belongsTo(Project, { foreignKey: 'project_id' });

Employee.hasMany(WeeklyEmployeeRecord, { foreignKey: 'employee_id' });
WeeklyEmployeeRecord.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = {
	sequelize,
	models: {
		User,
		Client,
		Employee,
		Estimate,
		ExtraExpense,
		MaterialStock,
		Payment,
		Project,
		Provider,
		Tool,
		WorkDay,
		WeeklyEmployeeRecord,
	},
}
