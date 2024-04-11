const Router = require('express')
const { createCategory, getCategories, editCategory, deleteCategory} = require('../controllers/category.controller.js')

const categoryRouter = Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategories)
categoryRouter.put('/edit/:id', editCategory)
categoryRouter.delete('/delete/:id', deleteCategory)




module.exports = categoryRouter