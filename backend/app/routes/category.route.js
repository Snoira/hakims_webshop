const Router = require('express')
const { createCategory, getCategories,} = require('../controllers/category.controller.js')

const categoryRouter = Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategories)




module.exports = categoryRouter