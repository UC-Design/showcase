<?php
/**
 * Member login Database config
 */
$host       = "localhost";
$username   = "root";
$password   = "root";
$dbname     = "car_show_tracker";
$dsn        = "mysql:host=$host;dbname=$dbname";
$options    = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
              );

/**--- CODE REFERENCE

Ben Ennis Butler. (Week 4-5-6 content). ‘work-tracker’.
Online step by step tutorial and GIT Hub file resources.
https://github.com/UC-Design/11058-back-end/tree/master/module-2/code/work-tracker

*/