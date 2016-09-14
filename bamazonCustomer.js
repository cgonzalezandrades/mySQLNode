var db = require('./bamazon');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');


console.log("\nHere is the list of the products\n");


db.connect();

db.query('SELECT * FROM products', function (err, rows, fields) {

    if (err) throw err;


    var table = new Table({
        head: ['Product ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
        colWidths: [15, 20, 20, 10, 20],
        //       style: { 'padding-left': , 'padding-right': 2 }
    });


    rows.forEach(function (value) {

        table.push(
     [value.itemID, value.productName, value.departmentName, value.price, value.stockQuantity]);


    });




    console.log(table.toString());


    inquirer.prompt([
        {
            name: 'productId',
            message: '\nEnter the ID of the product you would like to buy',
            type: 'input'
    },
        {
            name: 'quantity',
            message: 'Enter the quantity you want to buy',
            type: 'input',
    }

]).then(function (user) {

        if (table[user.productId][0] <= 10 && table[user.productId][4] < user.quatity) {

            console.log('yeah');
        } else {
            console.log('there is not enough')
        }

        //                console.log(table[0][0]);


    });



});




db.end();