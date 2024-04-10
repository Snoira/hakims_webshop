const Router = require('express')
const { createProduct, getProducts, startMessage, searchProducts, getProductbyCategory } = require('../controllers/product.controller.js')

const productsRouter = Router()

productsRouter.post('/', createProduct)
productsRouter.get('/', getProducts)
productsRouter.post('/search', searchProducts)
productsRouter.post('/products/category', getProductbyCategory);
productsRouter.get('/start', startMessage)



module.exports = productsRouter