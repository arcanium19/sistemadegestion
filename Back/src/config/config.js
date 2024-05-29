const dotenv = require('dotenv')
dotenv.config()


module.exports = {
	PORT: process.env.PORT,
	DB_INTERFACE: process.env.DB_INTERFACE,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	JWT_SECRET: process.env.JWT_SECRET,
}