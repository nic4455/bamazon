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
VALUES ("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Reebok High-Tops", "Footwear", 95, 500),
		("The Road to Wigan Pier", "Books", 14.95, 100),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000),
		("Ferrero Rocher", "Chocolate", 5.95, 1000);
        
SELECT * FROM products;