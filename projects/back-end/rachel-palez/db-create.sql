CREATE DATABASE to_do_task_listing;

use to_do_task_listing;

CREATE TABLE task_listing (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	task VARCHAR(30) NOT NULL,
	task_group VARCHAR(50) NOT NULL,
    due_date VARCHAR(30) NOT NULL,
	date TIMESTAMP
);


CREATE DATABASE users_registered;

use users_registered;

CREATE TABLE users (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date TIMESTAMP
);