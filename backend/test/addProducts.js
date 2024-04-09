const mongoose = require("mongoose");
const Product = require("../app/models/product.model");
const Category = require("../app/models/category.model");
const inquirer = require("inquirer");
const fs = require("fs");
require("dotenv").config();

async function addProducts() {
  try {
    await mongoose.connect(process.env.MONGOOSE_LIVE_URI);

    let addAnother = "Yes";
    while (addAnother === "Yes") {
      const categories = await Category.find({});
      const categoryNames = categories.map((category) => category.name);

      const { category } = await inquirer.prompt([
        {
          type: "list",
          name: "category",
          message: "Select a category or enter a new one: ",
          choices: [...categoryNames, "Enter a new category"],
        },
      ]);

      let categoryName;

      if (category === "Enter a new category") {
        const { newCategory } = await inquirer.prompt([
          {
            type: "input",
            name: "newCategory",
            message: "Enter the new category name: ",
          },
        ]);

        categoryName = newCategory;
      } else {
        categoryName = category;
      }

      let categoryDoc = await Category.findOne({ name: categoryName });
      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: categoryName });
      }

      const product = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter product name: ",
        },
        {
          type: "input",
          name: "price",
          message: "Enter product price: ",
          validate: function (value) {
            const valid = !isNaN(parseFloat(value));
            return valid || "please enter a valid product price.";
          },
        },
          {
          type: "input",
          name: "imageURL",
          message: "Enter product image URL: ",
          },
      ]);

      product.category = categoryDoc._id;

      await Product.create(product);

      const productData = {
        name: product.name,
        category: categoryName,
        price: product.price,
        imageURL: product.imageURL
      };

      let products;
      try {
        const data = fs.readFileSync("./test/products.json");
        products = JSON.parse(data);
      } catch (error) {
        products = [];
      }

      products.push(productData);

      fs.writeFileSync(
        "./test/products.json",
        JSON.stringify(products, null, 2)
      );

      console.log(
        `Product has been added successfully to the database.\n New product:\n Name: ${product.name} \n Category: ${categoryName} \n Price: ${product.price}.\n`
      );

      const { addAnother: shouldAddAnother } = await inquirer.prompt([
        {
          type: "list",
          name: "addAnother",
          message: "Do you want to add another product?",
          choices: ["Yes", "No"],
        },
      ]);

      addAnother = shouldAddAnother;
    }
  } catch (error) {
    console.error("Error adding product: ", error);
  } finally {
    await mongoose.connection.close();
  }
}

module.exports = addProducts;
