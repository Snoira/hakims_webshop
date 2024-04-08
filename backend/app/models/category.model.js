const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        text: true,
        required: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;