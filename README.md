# mySQLNode
This application simulates an Amazon store by reading through a mySQL table called products. If you would like to test this web app please clone the repo and create an Schema called `bamazon` with a table called products.

The items in the product table can be found in a `.csv` file can located in this repo.
To visualize the correct format of the table, terminal windows needs to be at least ## 96X39

-------

## bamazon.js  

Creates the connection to between the database and `bamazonCustomer.js` and `bamazonManager.js`


## bamazonCustomer.js 
Display and sell items in product table 

1.  Prompt user to enter a product ID. 
2.  Request quantity of purchase.
3. Ask user if he/she would like to buy another product.
4. Display `total no tax`,`tax` and `total with tax`

<img src="/images/bamazonCustomer.png" alt="bamazon customer" width ="50%"/> 
 
## bamazonManager.js 

Prompt user to select an option.

1. Show all products for sale.

* Display product table  

<img src="/images/productsForSale.png" alt="products for sale " width ="50%"/>.     

2. View low inventory.  
* Display products with less than 5 quantity.

<img src="/images/lowInventory.png" alt="low invetory" width ="50%"/>. 

3. Add inventory to an existent product.  

* Prompt user for product ID to be added.
* Enter quantity

<img src="/images/addInventory.png" alt="add invetory" width ="50%"/>. 

4. Add new product.  

* Request product name.
* Request product department.
* Request product price.
* Request Quantity.

<img src="/images/lowInventory.png" alt="low invetory" width ="50%"/>. 



 



