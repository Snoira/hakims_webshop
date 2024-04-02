const Product = require('../models/product.model.js');

async function createProduct(req, res) {
    try{
        const product = new Product(req.body)
        await product.save()
        res.status(201).send(product)
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

async function startMessage(req, res){
    res.status(200).send("Hello from the server")
}

module.exports = {
    createProduct,
    getProducts,
    startMessage
}