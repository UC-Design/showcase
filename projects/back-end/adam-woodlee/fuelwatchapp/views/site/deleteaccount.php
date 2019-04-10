<?php
include "/var/www/html/fuelwatchapp.com/admin/config/config.php";
include $function_and_classes;
$db = new database($profile_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config);
session($root_domain_config);
$user = new Registereduser;
$user->deleteaccount($db, $profile);
header("Location: fuelwatchapp.php"); 
exit;
?>