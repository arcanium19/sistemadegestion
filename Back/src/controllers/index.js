const { catchedAsync } = require("../utils");

module.exports = {
    user: {
        getAllUser: catchedAsync(require('./user.controllers/getAllUser'))
    }
}