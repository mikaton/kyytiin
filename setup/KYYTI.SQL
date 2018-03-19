CREATE DATABASE IF NOT EXISTS kyyti;
USE kyyti;

DROP TABLE IF EXISTS CustomersRides_ride;
DROP TABLE IF EXISTS CustomersCars;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Rides;
DROP TABLE IF EXISTS Customers;


CREATE TABLE IF NOT EXISTS Customers (
  social_id VARCHAR(500),
  social_token VARCHAR(500),
  social_provider VARCHAR(100),
  social_photourl VARCHAR(500),
  customer_id VARCHAR(100) NOT NULL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100),
  phonenumber VARCHAR(15),
  confirmed BOOLEAN NOT NULL DEFAULT false,
  reset_token VARCHAR(50) DEFAULT " ",
  reset_token_expiry DATETIME DEFAULT NOW(), 
  additional_information VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS Rides (
  ride_id VARCHAR(100) NOT NULL PRIMARY KEY,
  customer_id VARCHAR(100) NOT NULL,
  startingplace VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  journey VARCHAR(100),
  time_of_departure DATETIME NOT NULL,
  alternate_time_of_departure DATETIME NOT NULL,
  time_of_arrival DATETIME,
  alternate_time_of_arrival DATETIME,
  free_seats TINYINT NOT NULL,
  smoking BOOLEAN NOT NULL, 
  pets BOOLEAN NOT NULL,
  additional_information VARCHAR(512),
  hidden BOOLEAN NOT NULL,
  CONSTRAINT customer_ride_fk
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
      ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Reviews (
  review_id VARCHAR(100) NOT NULL PRIMARY KEY, 
  customer_id VARCHAR(100) NOT NULL,
  stars TINYINT NOT NULL,
  review_text VARCHAR(600),
  ALTER TABLE Reviews ADD review_created DATETIME default CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Cars ( 
  car VARCHAR(10) NOT NULL,
  brand VARCHAR(50),
  model VARCHAR(50),
  color VARCHAR(50),
  PRIMARY KEY (car)
);

CREATE TABLE IF NOT EXISTS CustomersCars (
  car VARCHAR(10) NOT NULL,
  customer_id VARCHAR(100) NOT NULL,
  CONSTRAINT customer_car
  FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(car) REFERENCES Cars(car)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CustomersRides_ride (
  customersrides_ride_id VARCHAR(100) NOT NULL,
  customer_id VARCHAR(100) NOT NULL,
  ride_id VARCHAR(100) NOT NULL,
  price MEDIUMINT, 
  provision MEDIUMINT,
  paid BOOLEAN,
  CONSTRAINT customer_ride_ride
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
	  ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY(ride_id) REFERENCES Rides(ride_id)
      ON UPDATE CASCADE ON DELETE CASCADE
);
