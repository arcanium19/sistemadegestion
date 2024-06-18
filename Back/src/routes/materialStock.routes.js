const { Router } = require('express')
const controllers = require('../controllers')

const material_stock_routes = Router()

material_stock_routes.get('/', controllers.stock.getAllStock)
material_stock_routes.get('/:id', controllers.stock.getStockById)
material_stock_routes.get('/code/:product_code', controllers.stock.getStockByCode)
material_stock_routes.get('/search', controllers.stock.getStockByName)
material_stock_routes.post('/', controllers.stock.createStock)
material_stock_routes.put('/:id', controllers.stock.updateStock)
material_stock_routes.delete('/:id', controllers.stock.deleteStock)

module.exports = material_stock_routes