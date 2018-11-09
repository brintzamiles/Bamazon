# Bamazon

## Getting Started
*Note: You must run the following command to get started...
``` $bash
npm install
```
*Exit Node app at any time by Ctrl +C

Bamazon is an Amazon-like storefront that uses MySQL. The app takes in orders from customers and deplete stock from the store's inventory. The app also has a Manager mode that allows managers to select the following from a menu:  View Products for Sale, View Low Inventory, Add to Inventory, and Add New Product

## Customer Mode - Purchasing
### Command line:  node bamazonCustomer.js
#### bamazonCustomer.js
##### Prompts user for input 
* The app first shows current inventory
* First option asks the customer to specify the item_id of the item that they would like to purchase and the quantity they would like to buy
* The second message should ask how many units of the product they would like to buy.
* The app shows current inventory again before prompting for a new item for purchase

* Screenshot of Results (Insufficient Inventory):  

* Screenshot of Results (Successful Purchase):  

## Manager Mode
###  Command line:  node bamazonManager.js
#### bamazonManager.js
##### Displays a menu list

* View Products for Sale    
** Screenshot of Results:  

* View Low Inventory
** Screenshot of Results:  

* Add to Inventory
** Screenshot of Results:  

* Add New Product
** Screenshot of Results:  

* Exit Manager Mode
** Screenshot of Results:  



## Technologies


* NodeJS
* NPM Packages
    * mySQL
    * Inquirer
   

## Links

https://brintzamiles.github.io/Bamazon/

## Author

* **Brintza Miles** - [brintzamiles](https://github.com/brintzamiles)
