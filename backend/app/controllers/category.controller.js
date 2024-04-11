const Category = require('../models/category.model.js');


async function createCategory(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newCategory = new Category({
            "name": name
        });
        console.log("newCategory: ", newCategory);
        await newCategory.save();
        res.status(201).send(newCategory);
    } catch (error) {
        console.log("fel i createCategory:", error);
        res.status(400).json({ message: "Error in createCategory" });
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

async function editCategory(req, res) {
    try{
        const id = req.params.id;
        const name = req.body;
        console.log("name: ", name)
        // if (!id || !name || !category || !price || !imageURL ) {
        //     return res.status(400).json({ message: "Missing required fields" });
        // } 
        if(!id){
            return res.status(400).json({ message: "Missing id" });
        } else if(!name){
            return res.status(400).json({ message: "Missing name" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, name); //,{new: true}
        console.log(updatedCategory)
        res.status(200).send(updatedCategory)    

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        // const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        console.log("deleted: ", deletedCategory)
        if(!deletedCategory){
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).send(deletedCategory)    

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createCategory,
    getCategories, 
    editCategory, 
    deleteCategory
};