<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../login.php");
    exit;
}
?>
 

<?php 
include "templates/header.php"; 
include "../public/body.php"; ?>

<div class="row welcome">
    <div class="col">
        <h2>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to your To-do list.</h2>
    </div>
    <div class="col text-right">
    
    <p>
        <a href="../public/logout.php" class="btn btn-danger">Logout</a>
    </p>
    </div>
</div>    

<div class="row registered-main">
        <h3>What would you like to do today?</h3>
</div>    
    
<div class="row text-center welcome">
    <div class="col">
        <a href="../public/read.php"><h3>></h3>
            <p>View tasks</p></a>
    </div>
    <div class="col">
        <a href="../public/create.php">
        <h3>+</h3>
            <p>Add a task</p></a>
    </div>
    
</div>

<?php
include "templates/footer.php"; ?>