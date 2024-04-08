const fs = require("fs");

async function addProducts() {
  const inquirer = await import("inquirer");

  const product = await inquirer.default.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter product name: ",
    },
    {
      type: "input",
      name: "category",
      message: "Enter product category: ",
    },
    {
      type: "input",
      name: "price",
      message: "Enter product price: ",
    },
  ]);

  const data = fs.readFileSync("./test/products.json");
  const products = JSON.parse(data);

  products.push(product);

  fs.writeFileSync("./test/products.json", JSON.stringify(products, null, 2));

  console.log(
    "Product has been added successfully to the products.json file.",
    product
  );

  const { addAnother } = await inquirer.default.prompt([
    {
      type: "list",
      name: "addAnother",
      message: "Do you want to add another product?",
      choices: ["Yes", "No"],
    },
  ]);

  if (addAnother === "Yes") {
    addProducts();
  } 
}

addProducts();
