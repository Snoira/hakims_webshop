const Router = require('express')
const { createProduct, getProducts, startMessage, searchProducts, editProduct,
    deleteProduct } = require('../controllers/product.controller.js')

const productsRouter = Router()

productsRouter.post('/', createProduct)
productsRouter.get('/', getProducts)
productsRouter.post('/search', searchProducts)
productsRouter.get('/start', startMessage)
productsRouter.put('/edit/:id', editProduct)
productsRouter.delete('/delete/:id', deleteProduct)



module.exports = productsRouter