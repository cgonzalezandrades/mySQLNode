var db = require('./bamazon');
var inquirer = require('inquirer');
var Table = require('cli-table');
var currentQuantity = 0;

db.connect();

//db.query('SELECT * FROM products', function (err, rows, fields) {
//
//    console.log(rows[0].stockQuantity);
//
//
//});



managerOptions();

function productForSaleDatabase() {


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

        managerOptions();


    });
}

function managerOptions() {
    inquirer.prompt([

        {
            name: 'options',
            message: 'choose an option',
            choices: ['Products for Sale', 'View low Inventory', 'Add Inventory', 'New Product', 'EXIT\n'],
            type: 'list'
    }


]).then(function (manager) {


        if (manager.options === 'Products for Sale') {
            //            console.log(manager.options[0]);

            productForSaleDatabase();

        }

        if (manager.options === 'View low Inventory') {
            //            console.log(manager.options[0]);

            lowInventory();
        }

        if (manager.options === 'Add Inventory') {
            //            console.log(manager.options[0]);

            addInventory();
        }

        if (manager.options === 'New Product') {
            //            console.log(manager.options[0]);

            newProduct();
        }

        if (manager.options === 'EXIT\n') {
            console.log(manager.options[0]);

            db.end();
        }







    })

}

function lowInventory() {

    db.query('SELECT * FROM products WHERE stockQuantity < 5', function (err, rows, fields) {

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

        managerOptions();


    });

}

function addInventory() {


    inquirer.prompt([

        {
            name: 'productId',
            message: '\nEnter the product ID\n',
            type: 'input',

    },
        {
            name: 'quantity',
            message: '\nEnter the quantity to Add\n',
            type: 'input',
    }


]).then(function (manager) {


        db.query('UPDATE `products` SET `stockQuantity` = `stockQuantity` +' + manager.quantity + ' WHERE itemID =' + manager.productId, function (err, rows, fields) {

            if (err) throw err;

            productForSaleDatabase();



        });


    });

}

function newProduct (){

    inquirer.prompt([
        {
            name: 'productName',
            message: 'Enter the product Name',
            type: 'input',
    },
        {
            name: 'department',
            message: 'Enter the product department',
            type: 'input',
        },
        {
            name: 'price',
            message: 'Enter the product price (user decimals)',
            type: 'input',
            
        },
        {
            name: 'stock',
            message: 'Enter the product stock quantity',
            type: 'input',
        }


    ]).then(function (manager) {

         db.query('INSERT INTO `products` (`productName`,`departmentName`, `price`, `stockQuantity`) VALUES('+ manager.productName + ','+ manager.department+','+ manager.price+ ',' + manager.stock +')',function (err, rows, fields) {

            if (err) throw err;

           productForSaleDatabase();



        });


    });




}