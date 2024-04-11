const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: Email,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: Number,
      required: true,
    },
    postNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
});

const Customer = mongoose.model("Customers", customerSchema);
module.exports = Customer;
