const Customer = require("../models/customer.model");

async function createCustomer(req, res) {
  try {
    const { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCustomer = new Customer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
    });

    console.log("newCustomer: ", newCustomer);
    await newCustomer.save();

    res.status(201).send(newCustomer);
  } catch (error) {
    console.log("fel i createCustomer:", error);
    res.status(400).json({ message: "Error in createCustomer" });
  }
}

module.exports = {
  createCustomer,
};
