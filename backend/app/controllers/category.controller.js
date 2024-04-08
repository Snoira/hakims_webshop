const Category = require('../models/category.model.js');
const Product = require('../models/category.model.js');

async function createCategory(req, res) {
    try{
        const { name } = req.body
        if(!name) {
            return res.status(400).json({message: "Missing required fields"})
        }
        const newCategory = new Category({
            "name": name
        })
        console.log("newCategory: ", newCategory)
        const savedCategory = new Category(newCategory)
        await savedCategory.save()
        res.status(201).send(savedCategory)
    } catch (error){
        console.log("fel i createCategory")
        res.status(400).json({message: "Error in createCategory"})
    }
}

async function getCategories(req, res){
    try{
        const categories = await Category.find()
        res.status(200).send(categories)
        console.log("Categories: ", categories)
    } catch(error){
        console.log("fel i getCategories")
        res.status(400).json({message: "Error in getCategories"})
    }
}

module.exports = {
    createCategory,
    getCategories, 
};