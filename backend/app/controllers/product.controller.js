const Product = require('../models/product.model.js');

async function createProduct(req, res) {
    try{
        const { name, category, price } = req.body
        if(!name || !category || !price) {
            return res.status(400).json({message: "Missing required fields"})
        }
        const newProduct = new Product({
            "name": name,
            "category": category,
            "price": price
        })
        console.log("newProduct: ", newProduct)
        const savedProduct = new Product(newProduct)
        await savedProduct.save()
        res.status(201).send(savedProduct)
    } catch (error){
        console.log("fel i createProduct")
        res.status(400).json({message: "Error in createProduct"})
    }
}

async function getProducts(req, res){
    try{
        const products = await Product.find()
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
        const products = await Product.find({ $text: { $search: query } });
        res.status(200).send(products);
    } catch(error) {
        console.error("Error searching products", error);
        res.status(500).json({ message: "Error"});
    }
}

async function startMessage(req, res){
    res.status(200).send("Hello from the server")
}

module.exports = {
    createProduct,
    getProducts,
    searchProducts,
    startMessage
};