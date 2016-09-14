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

    table.push('');

    rows.forEach(function (value) {



        table.push(
     [value.itemID, value.productName, value.departmentName, parseFloat(value.price), value.stockQuantity]);


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

            //                console.log(table);

            //        console.log(table[user.productId][0]);
            //        console.log(parseFloat(table[user.productId][4]));
            //
            //        console.log(user.quantity);


            if (user.quantity > table[user.productId][4]) {

                console.log('Insufficient Quantity');
            } else {
                console.log('you got it');

            }

        });
    



});




db.end();