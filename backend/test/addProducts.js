const fs = require('fs');


async function addProducts() {
    const inquirer = await import('inquirer');

    const product = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter product name: '
        },
        {
            type: 'input',
            name: 'category',
            message: 'Enter product category: '
        },
        {
            type: 'input',
            name: 'price',
            message: 'Enter product price: '
        },

    ]);
}