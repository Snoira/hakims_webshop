const Router = require('express')
const { createProduct, getProducts, startMessage } = require('../controllers/product.controller.js')

const productsRouter = Router()

productsRouter.post('/', createProduct)
productsRouter.get('/', getProducts)


module.exports = productsRouter