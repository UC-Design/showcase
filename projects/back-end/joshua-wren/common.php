<?php
/** 
    This file holds commonly used functions * Remember, keep the code DRY! 
**/
function escape($html) { return htmlspecialchars($html, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8"); }
?>

<!--- CODE REFERENCE

Ben Ennis Butler. (Week 4-5-6 content). ‘work-tracker’.
Online step by step tutorial and GIT Hub file resources.
https://github.com/UC-Design/11058-back-end/tree/master/module-2/code/work-tracker

--->