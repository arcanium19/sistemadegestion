const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const main_routes = require('./routes')
const { errorHandler } = require('./middlewares')

const server = express()

server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use('/api', main_routes)

server.use('*', async (req, res) => {
	res.status(404).json({
		error: true,
		message: 'Missing endpoint'
	})
})

server.use(errorHandler)

module.exports = server