DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(80) NOT NULL,
  price FLOAT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ferrero Rocher", "Chocolate", 5.95, 10000),
		("Sandals", "Footwear", 29.95, 10000),
		("The Road to Wigan Pier", "Books", 14.95, 1000),
		("In the First Circle", "Books", 19.95, 1000),
		("Apple AirPods", "Electronics", 185.95, 10000),
		("Cannon Rebel", "Electronics", 450, 5000),
		("Nest Thermostat", "Electronics", 230, 20000),
		("The Larry Sanders Show Box Set", "Movies & TV", 60, 3000),
		("Squatty Potty", "Lifestyle", 5.95, 20000),
		("Pampers Easy Ups Box", "Baby Products", 45, 50000);
        
SELECT * FROM products;