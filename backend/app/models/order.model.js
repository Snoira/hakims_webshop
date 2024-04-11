const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNummer: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  date: {
    type: String,
    require: true,
  },
  totalPrice: {
    type: Number,
  },
  totalPriceWithTax: {
    type: Number,
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
      },
      totalProductPrice: {
        type: Number,
      },
    },
  ],
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
