const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    database: `bamazon_db`

});

connection.connect(err => {
    if (err) throw error;
    console.log(`Welcome Bamazon Manager!  You are connected as ${connection.threadId}`);
    selectAction();

})

const showInventory = (products) => {

    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        setTimeout(selectAction, 2000);


    });

};


const addInventory = (products) => {

    console.table(products);

    inquirer.prompt([

        {
            type: "input",
            name: "ProductId",
            message: "What is the ID of the product you would like to add?"
        },

        {
            type: "input",
            name: "Quantity",
            message: "How many units of the product would you like to add?"
        }

    ]).then(inqResponse => {
        var found = false;

        for (var i = 0; i < products.length; i++) {
            var product_id = products[i].item_id;
            /*             console.log(product_id);
             */
            var product_name = products[i].product_name;
            /*             console.log(product_name);
             */
            var stock_quantity = products[i].stock_quantity;

            if (products[i].item_id == inqResponse.ProductId) {
                found = true;
                /*                 console.log("found true");
                 */
                const updatedQuantity = products[i].stock_quantity + parseInt(inqResponse.Quantity);




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

                    }

                );
                console.log(`Your Inventory update of ${inqResponse.Quantity} ${product_name}(s) is complete.`);
                console.log(`You now have ${updatedQuantity} ${product_name}(s)`);
                showInventory();
            }
        }

    })
};


const addProduct = (products) => {
    console.table(products);
    inquirer.prompt([{
            type: "input",
            name: "ProductName",
            message: "What is the Name of the product you would like to add?"
        },
        {
            type: "input",
            name: "DepartmentName",
            message: "What Department does it belong in?"
        },
        {
            type: "input",
            name: "Quantity",
            message: "How many units of the product would you like to add?"
        },
        {
            type: "input",
            name: "Price",
            message: "How much does it cost?"
        }

    ]).then(inqResponse => {




        var product_quantity = parseInt(inqResponse.Quantity);

        connection.query("insert into products set ?", {


                product_name: inqResponse.ProductName,
                department_name: inqResponse.DepartmentName,
                price: inqResponse.Price,
                stock_quantity: product_quantity
            },

            (err, res) => {
                if (err) throw err;
                console.log(`${inqResponse.Quantity} ${inqResponse.ProductName}(s) have been added`);

                showInventory();


            }

        )
    });
}




const selectAction = () => {

    inquirer.prompt([{
            type: "list",
            message: "Select an Action:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Manager Mode"],
            name: "mgrModeOptions"
        }


    ]).then(inqResponse => {
        connection.query("SELECT * FROM products", (err, res) => {
            if (err) throw err;
            switch (inqResponse.mgrModeOptions) {
                case "View Products for Sale":
                    console.log("Viewing Products for Sale");
                    showInventory(res);
                    break;

                case "View Low Inventory":
                    console.log("Viewing Low Inventory Items");
                    viewLowInventory(res);
                    break;
                case "Add to Inventory":
                    console.log("Adding inventory");
                    addInventory(res);
                    break;
                case "Add New Product":
                    console.log("Adding new product");
                    addProduct(res);
                    break;
                case "Exit Manager Mode":
                    console.log("Exiting Manager Mode");
                    connection.end();
                    break;
            }
        });

    });
}

const viewLowInventory = (products) => {
    const lowInventory = [];
    for (var i = 0; i < products.length; i++) {

        var stock_quantity = products[i].stock_quantity;

        if (products[i].stock_quantity < 5) {
            console.log("************************************Low Inventory************************************");
            lowInventory.push(products[i]);

        }



    }
    console.table(lowInventory);
    selectAction();


};