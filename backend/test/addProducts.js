const fs = require("fs");

async function addProducts() {
  try {
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
        validate: function(value){
          const valid = !isNaN(parseFloat(value));
          return valid || "please enter a valid product price."

        }
      },
    ]);

    const data = fs.readFileSync("./test/products.json");
    const products = JSON.parse(data);

    products.push(product);

    fs.writeFileSync("./test/products.json", JSON.stringify(products, null, 2));

    console.log(
      `Product has been added successfully to the products.json file.\n ----------------------------\n New product:\n Name: ${product.name} \n Category: ${product.category} \n Price: ${product.price} \n----------------------------\n`
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
  } catch (error) {
    console.error("Error adding product: ", error);
  }
}

addProducts();
