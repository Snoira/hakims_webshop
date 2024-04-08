const fs = require('fs')


async function editProducts() {
    const inquirer = await import('inquirer');
    const data = fs.readFileSync('./test/products.json');
    const products = JSON.parse(data);  

    const { productName } = await inquirer.default.prompt([
        {
            type: 'list',
            name: 'productName',
            message: 'Select the product you want to edit: ',
            choices: products.map(p => p.name)
        },
    ]);
}

editProducts();