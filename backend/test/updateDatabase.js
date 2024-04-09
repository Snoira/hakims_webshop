const mongoose = require("mongoose");
const Product = require("../app/models/product.model");
const fs = require("fs");
const Category = require("../app/models/category.model");

require("dotenv").config();

async function updateDatabase() {
  try {
    await mongoose.connect(process.env.MONGOOSE_LIVE_URI);
    await Product.deleteMany({});

    const data = fs.readFileSync("./test/products.json");
    const products = JSON.parse(data);

    for (let product of products) {

      let category = await Category.findOne({ name: product.category });
      if (!category) {
        category = await Category.create({ name: product.category });
      }

      product.category = [category._id];



      await Product.create(product);
    }

    console.log("Database has been updated successfully.");
  } catch (error) {
    console.error(
      "An error occurred while updating the database: ",
      error.message
    );
  } finally {
    mongoose.connection.close();
  }
}

updateDatabase();
