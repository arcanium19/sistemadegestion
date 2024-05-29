const { Sequelize } = require('sequelize')

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_INTERFACE, DB_USER } = require('./config')

const sequelize = new Sequelize(`${DB_INTERFACE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false,
	native: false
})

const User = require('../models/user.models')(sequelize)

module.exports = {
	sequelize,
	models: {
		User,
		// Puedes agregar más modelos aquí si los tienes
	},
}
