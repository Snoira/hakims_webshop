const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' // referens till category.model
    },
    price: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;