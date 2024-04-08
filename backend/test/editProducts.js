const fs = require("fs");

async function editProducts() {
  const inquirer = await import("inquirer");
  const data = fs.readFileSync("./test/products.json");
  const products = JSON.parse(data);

  const { productName } = await inquirer.default.prompt([
    {
      type: "list",
      name: "productName",
      message: "Select the product you want to edit: ",
      choices: products.map((p) => p.name),
    },
  ]);

  const product = products.find((p) => p.name === productName);

  const updatedProduct = await inquirer.default.prompt([
    {
      type: "input",
      name: "name",
      message: `Enter new name for the product (current: ${product.name}):`,
      default: product.name,
    },
    {
      type: "input",
      name: "category",
      message: `Enter new category for the product (current: ${product.category}):`,
      default: product.category,
    },
    {
      type: "input",
      name: "price",
      message: `Enter new price for the product (current: ${product.price}):`,
      default: product.price,
      validate: function (value) {
        const valid = !isNaN(parseFloat(value));
        return valid || "please enter a valid product price.";
      },
    },
  ]);

  Object.assign(product, updatedProduct);

  fs.writeFileSync("./test/products.json", JSON.stringify(products, null, 2));

  console.log(`Product has been updated: \n
    ---------------------------\n
    Name: ${product.name}\n
    Category: ${product.category}\n
    Price: ${product.price}\n 
    ---------------------------\n`);
}

editProducts();
