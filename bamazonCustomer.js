//importing bamazon connection to db variable
var db = require('./bamazon');

//inquirer: node package for prompt 
var inquirer = require('inquirer');
//cli-table: node package format items to appear in a table in the prompt
var Table = require('cli-table');
// colors: node package use for style the text in prompt
var colors = require('colors');

// Global variables.
var totalNoTax = 0.00;
var totalIncludingTax = 0.00;
var totalTax = 0.00;
var tax = 0.065;
var totalQuantity = 0;
var productLeft = 0;

//Welcoming the user through a prompt
console.log("\n----WELCOME TO BAMAZON----".bold.green);
console.log("---- Here is a list of the products we are selling ----\n".bold.green);

//Connecting to the database
db.connect();

//once the connection witht db is open, displayTableDatabase function show items in table.
displayTableDatabase();

function displayTableDatabase(table) {

  //db query selecting all products from table "products"
  db.query('SELECT * FROM products', function (err, rows, fields) {

    if (err) throw err;

    //create/formating a table object.
    var table = new Table({
      head: ['Product ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
      colWidths: [15, 20, 20, 10, 20],
    });

    //pushing items of products to table
    table.push('');

    //
    rows.forEach(function (value) {

      table.push(
     [value.itemID, value.productName, value.departmentName, parseFloat(value.price), value.stockQuantity]);

    });

    //console loging for testing
    console.log(table.toString());

    //pass table to userPrompt function for prompting the user.
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

//this function prompts the user with options. Here we I use inquirer
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


//once the user pick the product ID and the quantity, the values are passed as an object called "user"
]).then(function (user) {

    //Go to function updateTableDatabase to update table quantity
    updateTableDatabase(table);

    if (user.quantity > table[user.productId][4]) {

      console.log('Insufficient Quantity'.bold.red);
      console.log("Please try another product".green);
      userPrompt(table);
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

      console.log('\nTOTAL(Excluding Tax):--------> '.bold.cyan + totalNoTax + "$");
      console.log("TAX:-------->                  ".bold.cyan + totalTax.toFixed(2) + '$');
      console.log('TOTAL:-------->                '.bold.cyan + totalIncludingTax.toFixed(2) + '$\n');
      db.end();
      return;
    }



  });
}