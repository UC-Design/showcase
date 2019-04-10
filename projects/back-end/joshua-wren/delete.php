<?php 
    // include the config file 
    require "config-details.php";
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
            $sql = "DELETE FROM show_log WHERE id = :id";
            // Prepare the SQL
            $statement = $connection->prepare($sql);
            
            // bind the id to the PDO
            $statement->bindValue(':id', $id);
            
            // execute the statement
            $statement->execute();
            // Success message
            $success = "<h4>Work successfully deleted</h4>";
        } catch(PDOException $error) {
            // if there is an error, tell us what it is
            echo $sql . "<br>" . $error->getMessage();
        }
    };
    // This code runs on page load
    try {
        $connection = new PDO($dsn, $username, $password, $options);
		
        // SECOND: Create the SQL 
        $sql = "SELECT * FROM show_log";
        
        // THIRD: Prepare the SQL
        $statement = $connection->prepare($sql);
        $statement->execute();
        
        // FOURTH: Put it into a $result object that we can access in the page
        $result = $statement->fetchAll();
    } catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }
?>

<!DOCTYPE html>
<html>
<div class="mainbacking">
    
    <?php include "templates/reset-logout.php"; ?>

    <?php include "templates/header.php"; ?>

    <!------------------------MAIN NAV DIV start------------------------->
    <header class="mainHeader">
        <nav>
            <ul>
                <li><a href="welcome.php">Home</a></li>
                <li><a href="create.php">Add a car show</a></li>
                <li><a href="read.php">See car shows</a></li>
                <li><a href="update.php">Update a car show</a></li>
                <li class="active"><a href="delete.php">Delete a car show</a></li>
                <li><a href="contact.php">Contact us</a></li>
            </ul>
        </nav>
    </header>
    <!------------------------MAIN NAV DIV end------------------------->

    <div class="contentContainer">

        <?php if ($success) echo $success; ?>
        <!-- This is a loop, which will loop through each result in the array -->
        <?php foreach($result as $row) { ?>

        <h2>Delete a car show</h2>

        <p2>
            ID:
            <?php echo $row['id']; ?><br> Title:
            <?php echo $row['title']; ?><br> Description:
            <?php echo $row['description']; ?><br> Date/s:
            <?php echo $row['event_date']; ?><br> Location:
            <?php echo $row['location']; ?><br> Parking:
            <?php echo $row['parking']; ?><br> Entry fees:
            <?php echo $row['entry_fees']; ?><br> Spectator fees:
            <?php echo $row['spectator_fees']; ?><br> Other details:
            <?php echo $row['other_detail']; ?><br>
            <a href='delete.php?id=<?php echo $row['id']; ?>'>Delete</a>
            <hr>
        </p2>
        <?php }; //close the foreach
?>
    </div>

    <?php include "templates/footer.php"; ?>
</div>

</html>

<!--- CODE REFERENCE

Ben Ennis Butler. (Week 4-5-6 content). ‘work-tracker’.
Online step by step tutorial and GIT Hub file resources.
https://github.com/UC-Design/11058-back-end/tree/master/module-2/code/work-tracker

--->