const { catchedAsync } = require('../utils')

module.exports = {
	user: {
		getAllUser: catchedAsync(require('./user.controllers/getAllUser')),
		getUserById: catchedAsync(require('./user.controllers/findUserById')),
		createUser: catchedAsync(require('./user.controllers/createUser')),
		deleteUser: catchedAsync(require('./user.controllers/deleteUser')),
		updateUser: catchedAsync(require('./user.controllers/updateUser')),
		loginUser: catchedAsync(require('./user.controllers/loginUser')),
		loginGoogleUser: catchedAsync(require('./user.controllers/loginGoogle')),
	},
	client: {
		getAllClient: catchedAsync(require('./client.controllers/getAllClient')),
		getClientById: catchedAsync(require('./client.controllers/getClientById')),
		createClient: catchedAsync(require('./client.controllers/createClient')),
		deleteClient: catchedAsync(require('./client.controllers/deleteClient')),
		updateClient: catchedAsync(require('./client.controllers/updateClient')),
	},
	employee: {
		getAllEmployee: catchedAsync(require('./employee.controllers/getAllEmployee')),
		getEmployeeById: catchedAsync(require('./employee.controllers/getEmployeeById')),
		createEmployee: catchedAsync(require('./employee.controllers/createEmployee')),
		deleteEmployee: catchedAsync(require('./employee.controllers/deleteEmployee')),
		updateEmployee: catchedAsync(require('./employee.controllers/updateEmployee')),
	},
	project: {
		getAllProject: catchedAsync(require('./project.controllers/getAllProjects')),
		getProjectById: catchedAsync(require('./project.controllers/getProjectById')),
		createProject: catchedAsync(require('./project.controllers/createProject')),
		deleteProject: catchedAsync(require('./project.controllers/deleteProject')),
		updateProject: catchedAsync(require('./project.controllers/updateProject')),
	},
	provider: {
		getAllProvider: catchedAsync(require('./provider.controllers/getAllProvider')),
		getProviderById: catchedAsync(require('./provider.controllers/getProviderById')),
		createProvider: catchedAsync(require('./provider.controllers/createProvider')),
		deleteProvider: catchedAsync(require('./provider.controllers/deleteProvider')),
		updateProvider: catchedAsync(require('./provider.controllers/updateProvider')),
	},
	tool: {
		getAllTool: catchedAsync(require('./tool.controllers/getAllTools')),
		getToolById: catchedAsync(require('./tool.controllers/getToolById')),
		createTool: catchedAsync(require('./tool.controllers/createTool')),
		deleteTool: catchedAsync(require('./tool.controllers/deleteTool')),
		updateTool: catchedAsync(require('./tool.controllers/updateTool')),
	},
	stock: {
		getAllStock: catchedAsync(require('./materialStock.controllers/getAllStock')),
		getStockById: catchedAsync(require('./materialStock.controllers/getStockById')),
		getStockByCode: catchedAsync(require('./materialStock.controllers/getStockByCode')),
		getStockByName: catchedAsync(require('./materialStock.controllers/getStockByName')),
		createStock: catchedAsync(require('./materialStock.controllers/createNewStock')),
		deleteStock: catchedAsync(require('./materialStock.controllers/deleteStock')),
		updateStock: catchedAsync(require('./materialStock.controllers/updateStock')),
	},
}