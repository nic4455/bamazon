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
    managerMenu();
});

function managerMenu() {
    console.log("~~~~~~~~~~ MANAGER BAMAZON ~~~~~~~~~~");
    inquirer.prompt([
        {
            type: "list",
            name: "managerSelectionList",
            message: "What would you like to check in the inventory?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

        }
    ]).then(function (managerResponses) {
        if (managerResponses.managerSelectionList === "View Products for Sale") {
            console.log("Showing product list: ");
            viewProducts();
        } else if (managerResponses.managerSelectionList === "View Low Inventory") {
            console.log("Showing low inventory: ");
            showLowInventory();
        } else if (managerResponses.managerSelectionList === "Add to Inventory") {
            console.log("Add to inventory: ");
            addInventory();
        } else if (managerResponses.managerSelectionList === "Add New Product") {
            console.log("Add new product: ");
            addProduct();
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        console.log("~~~~~~~~~~ Today's Inventory ~~~~~~~~~~");
        for (var i = 0; i < result.length; i++) {
            console.log("Item ID: " + result[i].item_id + " || Product Name: " + result[i].product_name + " || Department: " + result[i].department_name + " || Price: $" + result[i].price + " || Inventory Quantity: " + result[i].stock_quantity);
        }
        managerMenu();
    });
};

function showLowInventory() {
    connection.query("SELECT * FROM products", function (error, result) {
        if (error) throw error;
        console.log("~~~~~~~~~~ Today's Low Inventory ~~~~~~~~~~");
        for (var i = 0; i < result.length; i++) {
            if (result[i].stock_quantity < 1000) {
                console.log(result[i].product_name + " is understocked, only " + result[i].stock_quantity + " units are left.");
            } 
            // else {
            //     console.log(result[i].product_name + " stocked above 1000 units.")
            // }
        }
        managerMenu();
    });
};

function addInventory() {
    console.log("~~~~~~~~~~ Add Inventory ~~~~~~~~~~ ")
    inquirer.prompt([
        {
            type: "input",
            name: "addProductInventory",
            message: "Which item would you like to add more inventory to? Enter an ID number: "
        },
        {
            type: "input",
            name: "numberToBeAdded",
            message: "How many units would you like to add to the inventory? "
        }
    ]).then(function (managerResponses) {
        connection.query("SELECT * FROM products", function (error, result) {
            if (error) throw error;
            for (var i = 0; i < (result.length); i++) {
                if (result[i].item_id == managerResponses.addProductInventory) {
                    connection.query("UPDATE products SET stock_quantity='" + (parseInt(result[i].stock_quantity) + parseInt(managerResponses.numberToBeAdded)) + "' WHERE item_id = '" + parseInt(result[i].item_id) + "'"), function (error, result) {
                        if (error) throw error;
                        console.log("Quantity of " + result[i].product_name + " has been updated by " + managerResponses.numberToBeAdded + ".");

                    }
                }
            }
            managerMenu();
        })
    });

};

function addProduct() {
    console.log("~~~~~~~~~~ Add Product ~~~~~~~~~~ ")
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "Product name: "
        },
        {
            name: "departmentName",
            type: "input",
            message: "Product department: ",
        },
        {
            type: "input",
            name: "priceInput",
            message: "Product price: "
        },
        {
            type: "input",
            name: "stockQuantity",
            message: "Number of units: "
        }
    ]).then(function (managerResponses) {
        connection.query("SELECT * FROM products", function (error, result) {
            if (error) throw error;
            connection.query("INSERT INTO products SET ?",
                {
                    // item_id: parseInt(result.length + 1),
                    product_name: managerResponses.productName,
                    department_name: managerResponses.departmentName,
                    price: managerResponses.priceInput,
                    stock_quantity: managerResponses.stockQuantity
                },
                function (error) {
                    if (error) throw error;
                    console.log("Item added succesfully!");
                    managerMenu();
                });
        });
    });
}