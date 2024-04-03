const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        required: true,
        trim: true
    },
    category: {
        type: String,
        text: true,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product