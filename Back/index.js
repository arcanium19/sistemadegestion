const server = require('./src/server')
const config = require('./src/config/config')
const { sequelize } = require('./src/config/database')
const { generateFakeUsers, generateFakeClients, generateFakeEmployees, generateFakeProviders } = require('./src/config/faker')

server.listen(`${config.PORT}`, async () => {
	try {
		await sequelize.sync({ force: true })
		console.log(`Server running on port: ${config.PORT}`)
		console.log('Database synchronized successfully.')
		await generateFakeUsers();
		await generateFakeClients();
		await generateFakeProviders();
		await generateFakeEmployees();
		console.log('Database info Loaded.')

	} catch (error) {
		console.log('ERROR:', error.message)
	}

})
