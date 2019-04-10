<?php
// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();
 
// Redirect to login page
header("location: index.php");
exit;
?>

<!--- CODE REFERENCE

Tutorial Republic. ‘PHP MySQL Login System’.
Online step by step tutorial.
https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

--->