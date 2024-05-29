const { catchedAsync } = require('../utils')

module.exports = {
	user: {
		getAllUser: catchedAsync(require('./user.controllers/getAllUser')),
		getUserById: catchedAsync(require('./user.controllers/findUserById')),
		createUser: catchedAsync(require('./user.controllers/createUser')),
		deleteUser: catchedAsync(require('./user.controllers/deleteUser')),
		updateUser: catchedAsync(require('./user.controllers/updateUser')),
		loginUser: catchedAsync(require('./user.controllers/loginUser')),
	}
}