const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

const connection = mysql.createConnection({
    host: `localhost`,
    port:  process.env.DB_PORT || 3306,
    user: `root`,
    database: `bamazon_db`

});

connection.connect(err => {
    if (err) throw error;
    console.log(`Welcome Bamazon Customer!  You are connected as ${connection.threadId}`);
    showInventory();

})

const showInventory = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        PurchaseProduct(res);

    });

};


    const PurchaseProduct = (products) => {
        inquirer.prompt([

            {
                type: "input",
                name: "ProductId",
                message: "What is the ID of the product you would like to purchase?"
            },

            {
                type: "input",
                name: "Quantity",
                message: "How many units of the product would you like to purchase?"
            }


        ]).then(inqResponse => {
/*             console.log(inqResponse);
 */            for (var i = 0; i < products.length; i++) {
                var price = products[i].price;
                /* console.log(price); */
                var product_name = products[i].product_name;
                /* console.log(product); */
                var stock_quantity = products[i].stock_quantity;

                if (products[i].item_id == inqResponse.ProductId) {
                    /* console.log(products);
                    console.log("item match"); */
                    if (products[i].stock_quantity >= inqResponse.Quantity) {
                        /*  console.log("quantity avail"); */
                        const updatedQuantity = products[i].stock_quantity - inqResponse.Quantity;
                        /*                     console.log(updatedQuantity);
                         */
                        const totalPrice = parseFloat(inqResponse.Quantity * price).toFixed(2);

                            
                        console.log(`Your Bamazon purchase of ${inqResponse.Quantity} ${product_name}(s) @$${price} per unit is $${totalPrice} is complete.`);
                        console.log(`Thank you for your purchase!`); 
                        connection.query("UPDATE products SET ? WHERE ?",
                            [{
                                    stock_quantity: updatedQuantity
                                },
                                {
                                    item_id: products[i].item_id
                                }
                            ],
                                (err, res) => {
                                    if (err) throw err;
                                showInventory();


                                
                        }
                    );
                } else {
                    console.log(`We don't have sufficient inventory to fulfill your order of ${inqResponse.Quantity} items.  Please try again.`);
                   /*  console.log(`We don't have sufficient inventory to fulfill your order of  ${product}(s)`);
                    console.log(`There are only ${i} ${stock_quantity} in stock. Please try again.`); */
                    showInventory();

                }
            }
        }

    });
}