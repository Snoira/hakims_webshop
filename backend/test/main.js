const mongoose = require("mongoose");
const inquirer = require("inquirer");
const addProducts = require("./addProducts");
const editProducts = require("./editProducts");
// require("events").EventEmitter.defaultMaxListeners = 20;
const updateDatabase = require("./updateDatabase");

require("dotenv").config();

const menu = async () => {
  try {
    
    await mongoose.connect(process.env.MONGOOSE_LIVE_URI);
    while (true) {
      const { choice } = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "Menu: ",
          choices: [
            "Add a product",
            "Update product information",
            "Update the database",
            "Exit",
          ],
        },
      ]);

      switch (choice) {
        case "Add a product":
          await addProducts();
          break;
        case "Update product information":
          await editProducts();
          break;
        case "Update the database":
          await updateDatabase();
          break;
        case "Exit":
          await mongoose.connection.close();
          return;
      }
    }
  } catch (error) {
    console.error("An error occurred while running the menu: ", error.message);
  }
};


menu();


// (async () => {  
//     await menu();
// })()
