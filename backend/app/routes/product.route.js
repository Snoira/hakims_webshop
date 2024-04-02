const Router = require('express')
const { createProduct, getProducts, startMessage } = require('../controllers/product.controller.js')

const productsRouter = Router()


productsRouter.get('/', startMessage)
productsRouter.get('/start', startMessage)
productsRouter.post('/', createProduct)
productsRouter.get('/products', getProducts)


module.exports = productsRouter