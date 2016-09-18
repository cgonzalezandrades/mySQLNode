var db = require('./bamazon');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');


var totalNoTax = 0.00;
var totalIncludingTax= 0.00;
var totalTax = 0.00;
var tax = 0.065;
var totalQuantity = 0;
var productLeft = 0;



console.log("\n----WELCOME TO BAMAZON----".bold.green);
console.log("---- Here is a list of the products we are selling ----\n".bold.green);


db.connect();

displayTableDatabase();

function displayTableDatabase(table) {

    db.query('SELECT * FROM products', function (err, rows,fields) {

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

function updateTableDatabase(table) {

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


function userPrompt(table) {

    inquirer.prompt([

        {
            name: 'productId',
            message: '\nEnter the ID of the product you would like to buy\n',
            type: 'input',

    },
        {
            name: 'quantity',
            message: '\nEnter the quantity you want to buy\n',
            type: 'input',
    }



]).then(function (user) {

        updateTableDatabase(table);

//        console.log(table[user.productId][4]);


        if (user.quantity > table[user.productId][4]) {

            console.log('Insufficient Quantity'.bold.red);
            console.log("Please try another product".green);            userPrompt(table);
        } else {

            
            productLeft = table[user.productId][4] - user.quantity;
            totalNoTax += table[user.productId][3] * user.quantity;
            
            totalTax = totalNoTax * tax;
            
            totalIncludingTax = totalTax + totalNoTax;
            
            
            

            db.query('UPDATE `products` SET `stockQuantity` =' + productLeft + ' WHERE itemID =' + user.productId, function (err, rows, fields) {

                if (err) throw err;

            });


            console.log('PRODUCT ORDERED !'.bold.green);


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
        } else {
            
            console.log('\nTOTAL(Excluding Tax):--------> '.bold.cyan + totalNoTax +"$");
            console.log("TAX:-------->                  ".bold.cyan + totalTax.toFixed(2)+'$');
            console.log('TOTAL:-------->                '.bold.cyan + totalIncludingTax.toFixed(2)+'$\n');
            db.end();
            return;
        }



    });
}
