<?php
/* Database credentials. */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'car_show_tracker');
 

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>

<!--- CODE REFERENCE

Tutorial Republic. ‘PHP MySQL Login System’.
Online step by step tutorial.
https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

--->