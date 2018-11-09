DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


	CREATE TABLE products(
	item_id integer not null auto_increment primary key,
	product_name varchar (100) NOT NULL,
	department_name varchar (50) NOT NULL, 
    price decimal (10,2),
    stock_quantity integer(10)
    );
	  --
   insert into products (product_name, department_name, price, stock_quantity) values 
      
	  ("Alexa Echo Dot (3rd Gen)", "Electronics", 49.99, 100),
      ("Alexa Echo Dot (2nd Gen)", "Electronics", 29.99, 200), 
      ("Reverse/Inverted Double-Layer Waterproof Straight Umbrella", "Luggage & Travel Gear", 21.99, 50),
      ("Hardside Spinner Luggage",  "Luggage & Travel Gear", 60.99, 167), 
      ("15pc Rose Gold Make Up Brushes Set", "Beauty & Personal Care", 19.99, 1000),
      ("Remington PG6025 All-in-1 Lithium Powered Grooming Kit",  "Beauty & Personal Care", 20.00, 150),
      ("Echo Show (2nd Gen)",  "Electronics", 229.99, 600),
      ("Echo Dot Kids Edition", "Electronics", 59.99, 100),
      ("Leaf Blower Vacuum", "Outdoor Power Tools", 59.99, 90),
	 ("Lawn Mower Battery Included", "Outdoor Power Tools", 246.99, 89)
     
     ;
      
	  


    