const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true,
    required: true,
    trim: true,
  },
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
