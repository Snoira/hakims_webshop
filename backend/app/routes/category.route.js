const Router = require('express')
const { createCategory, getCategories, getCategory, editCategory, deleteCategory} = require('../controllers/category.controller.js')

const categoryRouter = Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategories)
categoryRouter.get('/:id', getCategory)
categoryRouter.put('/edit/:id', editCategory)
categoryRouter.delete('/delete/:id', deleteCategory)




module.exports = categoryRouter