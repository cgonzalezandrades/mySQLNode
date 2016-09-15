var db = require('./bamazon');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');


var totalPrice = 0.00;
var totalQuantity = 0;
var productLeft = 0;

console.log("\nHere is the list of the products\n");


db.connect();

function displayTableDatabase() {

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



        userPrompt(table)



    });
}

function updateTableDatabase() {

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

    });
}

displayTableDatabase();

function userPrompt(table) {
    inquirer.prompt([
        {
            name: 'productId',
            message: '\nEnter the ID of the product you would like to buy\n',
            type: 'input'
    },
        {
            name: 'quantity',
            message: '\nEnter the quantity you want to buy\n',
            type: 'input',
    }



]).then(function (user) {

        updateTableDatabase(table);
        
        console.log(table[user.productId][4]);



        if (user.quantity > table[user.productId][4]) {

            console.log('Insufficient Quantity');
            userPrompt(table);
        } else {

            productLeft = table[user.productId][4] - user.quantity;
            totalPrice += table[user.productId][3] * user.quantity;

            db.query('UPDATE `products` SET `stockQuantity` =' + productLeft + ' WHERE itemID =' + user.productId, function (err, rows, fields) {

                if (err) throw err;

            });



            console.log('you got it');
            

            orderAgain();

        }



    });
}

function orderAgain(table) {
    inquirer.prompt([
        {
            name: 'anotherOrder',
            message: '\nWould you like to order another product ?',
            type: 'confirm'
   }


]).then(function (user) {

        if (user.anotherOrder) {
            displayTableDatabase();
            userPrompt();
        } else {
            console.log('the total of you or order is: ' + totalPrice);
                        db.end();
            return;
        }



    });
}