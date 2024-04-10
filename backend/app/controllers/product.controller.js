const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');

async function createProduct(req, res) {
    try {
        const { name, category, price, imageURL, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let categoryId;

        
        if (mongoose.Types.ObjectId.isValid(category)) {
            categoryId = category;
        } else {
            // hitta kategori med namn
            const foundCategory = await Category.findOne({ name: category });
            if (!foundCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            categoryId = foundCategory._id;
        }

        const newProduct = new Product({
            "name": name,
            "category": categoryId,
            "price": price,
            "imageURL": imageURL
        });

        console.log("newProduct: ", newProduct);
        
        const savedProduct = await newProduct.save();
        res.status(201).send(savedProduct);
    } catch (error) {
        console.log("Error in createProduct:", error);
        res.status(400).json({ message: "Error in createProduct" });
    }
}



async function getProducts(req, res){
    try{
        const products = await Product.find().populate('category');
        res.status(200).send(products)
        console.log("Products: ", products)
    } catch(error){
        console.log("fel i getProducts")
        res.status(400).json({message: "Error in getProducts"})
    }
}

async function searchProducts(req, res) {
    try {
        const { query } = req.body;

        const products = await Product.find({ 
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Sök i produktnamn
                { category: { $in: await Category.find({ name: { $regex: query, $options: 'i' } }).select('_id') } } // Sök i kategorinamn
            ] 
        }).populate('category');
        res.status(200).send(products);
    } catch(error) {
        console.error("Error searching products", error);
        res.status(500).json({ message: "Error"});
    }
}

async function editProduct(req, res) {
    try{
        const id = req.params.id;
        const { name, category, price, imageURL, description } = req.body;
        // if (!id || !name || !category || !price || !imageURL ) {
        //     return res.status(400).json({ message: "Missing required fields" });
        // } 
        if(!id){
            return res.status(400).json({ message: "Missing id" });
        } else if(!name){
            return res.status(400).json({ message: "Missing name" });
        } else if(!category){
            return res.status(400).json({ message: "Missing category" });
        } else if(!price){
            return res.status(400).json({ message: "Missing price" });
        } else if(!imageURL){
            return res.status(400).json({ message: "Missing imageURL" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price, imageURL }); //,{new: true}
        console.log(updatedProduct)
        res.status(200).send(updatedProduct)    

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        // const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        console.log(deletedProduct)
        res.status(200).send(deletedProduct)    

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function startMessage(req, res){
    res.status(200).send("Hello from the server")
}

module.exports = {
    createProduct,
    getProducts,
    searchProducts,
    startMessage,
    editProduct,
    deleteProduct
};