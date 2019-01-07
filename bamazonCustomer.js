var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        
        console.log("~~~~~~~~~~ BAMAZON ~~~~~~~~~~");
        console.log("~~~~~~~~~~ Today's inventory ~~~~~~~~~~");
        for (var i = 0; i < result.length; i++) {
            console.log("Item ID: " + result[i].item_id + " || Product Name: " + result[i].product_name + " || Price: $" + result[i].price);
        }
        chooseProduct(result);
    });
};

function chooseProduct(result) {
    inquirer.prompt([
        {
            type: "input",
            name: "ID",
            message: "Please input the item ID of the item you would like to purchase: "
        },
        {
            type: "input",
            name: "numToBuy",
            message: "How many items would you like to purchase?",
        }
    ]).then(function (userResponses) {
        for (var i = 0; i < (result.length); i++) {
            if (result[i].item_id == userResponses.ID) {
                chosenItem = result[i];
                
                if (((chosenItem.stock_quantity) - (userResponses.numToBuy)) > 0) {
                    connection.query("UPDATE products SET stock_quantity='" + parseInt(result[i].stock_quantity - userResponses.numToBuy) + "' WHERE item_id ='" + parseInt(result[i].item_id) + "'", function (error, result) {
                        if (error) throw error;
                        console.log("Purchase of " + parseInt(userResponses.numToBuy) + " " + chosenItem.product_name + " complete. The total ammount to be charged is $" + parseFloat(userResponses.numToBuy * chosenItem.price).toFixed(2) + "\n");
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "anotherPurchase",
                                message: "Would you like to see today's inventory again?",
                                choices: ["Yes", "No"]
                            }]).then(function (userResponses) {
                                if (userResponses.anotherPurchase  == "Yes") {
                                    readProducts();
                                } else {
                                    process.exit();
                                }
                            })
                        
                    })
                } else if (userResponses.numToBuy > result[i].stock_quantity) {
                    console.log("Insufficient quantity!");
                    readProducts();
                } else {
                    console.log("Invalid command");
                    readProducts();
                }
            
            }        

        }
    })
}