module.exports = {
    errorHandler: require('./handlerError.middleware'),
    auth: require('./auth'),
    token: require('./token'),
}