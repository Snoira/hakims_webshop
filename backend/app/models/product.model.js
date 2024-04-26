const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // referens till category.model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comparisonPrice: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

// jämförpris (typ kr/g)
// mängd (t ex 2 st, 500 g, 3 liter)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
