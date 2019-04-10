<?php 
	
    // include the config file
    require "../config.php"; 
    require "common.php";

// This code will only run if the delete button is clicked
    if (isset($_GET["id"])) {
	    // this is called a try/catch statement 
        try {
            // define database connection
            $connection = new PDO($dsn, $username, $password, $options);
            
            // set id variable
            $id = $_GET["id"];
            
            // Create the SQL 
            $sql = "DELETE FROM task_listing WHERE id = :id";

            // Prepare the SQL
            $statement = $connection->prepare($sql);
            
            // bind the id to the PDO
            $statement->bindValue(':id', $id);
            
            // execute the statement
            $statement->execute();

            // Success message
            $success = "TASK successfully deleted";

        } catch(PDOException $error) {
            // if there is an error, tell us what it is
            echo $sql . "<br>" . $error->getMessage();
        }
    };

    // This code runs on page load
    try {
        $connection = new PDO($dsn, $username, $password, $options);
		
        // SECOND: Create the SQL 
        $sql = "SELECT * FROM task_listing";
        
        // THIRD: Prepare the SQL
        $statement = $connection->prepare($sql);
        $statement->execute();
        
        // FOURTH: Put it into a $result object that we can access in the page
        $result = $statement->fetchAll();
    } catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }


?>


<?php include "templates/header.php";
include "../public/body.php"; 
include "../public/logout-block.php";
?>



  

<div class="row">
    <div class="col">
    <h2>Task has been deleted</h2>
    </div>

   <div class="col">
    <a href="../public/read.php"><button type="button" class="btn btn-outline-info otherbtn">Go back to task list</button></a>
    </div>
</div>



<hr>
<div class="row registered-main"></div>

<?php include "templates/footer.php"; ?>