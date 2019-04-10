<?php 
// this code will only execute after the submit button is clicked
if (isset($_POST['submit'])) {
	
    // include the config file that we created before
    require "config-details.php"; 
    
    // this is called a try/catch statement 
	try {
        // FIRST: Connect to the database
        $connection = new PDO($dsn, $username, $password, $options);
		
        // SECOND: Get the contents of the form and store it in an array
        $new_show_log = array( 
            "title" => $_POST['title'], 
            "description" => $_POST['description'],
            "event_date" => $_POST['event_date'],
            "location" => $_POST['location'], 
            "parking" => $_POST['parking'], 
            "entry_fees" => $_POST['entry_fees'], 
            "spectator_fees" => $_POST['spectator_fees'], 
            "other_detail" => $_POST['other_detail'], 
        );
        
        // THIRD: Turn the array into a SQL statement
        $sql = "INSERT INTO show_log (title, description, event_date, location, parking, entry_fees, spectator_fees, other_detail) VALUES (:title, :description, :event_date, :location, :parking, :entry_fees, :spectator_fees, :other_detail)";        
        
        // FOURTH: Now write the SQL to the database
        $statement = $connection->prepare($sql);
        $statement->execute($new_show_log);
	} catch(PDOException $error) {
        // if there is an error, tell us what it is
		echo $sql . "<br>" . $error->getMessage();
	}	
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
                <li class="active"><a href="create.php">Add a car show</a></li>
                <li><a href="read.php">See car shows</a></li>
                <li><a href="update.php">Update a car show</a></li>
                <li><a href="delete.php">Delete a car show</a></li>
                <li><a href="contact.php">Contact us</a></li>
            </ul>
        </nav>
    </header>
    <!------------------------MAIN NAV DIV end------------------------->

    <div class="contentContainer">

        <h4>
            <?php if (isset($_POST['submit']) && $statement) { ?>
            Car show details successfully added.
            <?php } ?>
        </h4>

        <h2>Add a car show</h2>
        <p>
            There is no limit to the car shows a user may choose to post, though factual information is required as posts and information will be accessible by all group members.
            Please complete the form below to post a car show.
        </p>
        <img src="assets/images/Car-Show.jpg" alt="Car Show Tracker logo" class="contentImage" />
        <br>
        <br>
        <p>
            Fill out the form below to post a car show.
        </p>

        <br>
        <!--form to collect data for each artwork-->
        <div class="form-group">
            <form method="post">

                <label for="title">Title</label>
                <input type="text" name="title" id="title" class="form-control">

                <label for="description">Description</label>
                <textarea class="form-control" name="description" rows="5" id="description"></textarea>

                <label for="event_date">Date/s</label>
                <input type="text" name="event_date" id="event_date" class="form-control">

                <label for="location">Location</label>
                <input type="text" name="location" id="location" class="form-control">

                <label for="parking">Parking details</label>
                <input type="text" name="parking" id="parking" class="form-control">

                <label for="entry_fees">Entry fees</label>
                <input type="text" name="entry_fees" id="entry_fees" class="form-control">

                <label for="spectator_fees">Spectator fees</label>
                <input type="text" name="spectator_fees" id="spectator_fees" class="form-control">

                <label for="other_detail">Other details</label>
                <textarea class="form-control" name="other_detail" rows="5" id="other_detail"></textarea>

                <input type="submit" name="submit" value="Submit" class="btn btn-primary">

            </form>

        </div>
    </div>

    <?php include "templates/footer.php"; ?>
</div>

</html>

<!--- CODE REFERENCE

Ben Ennis Butler. (Week 4-5-6 content). ‘work-tracker’.
Online step by step tutorial and GIT Hub file resources.
https://github.com/UC-Design/11058-back-end/tree/master/module-2/code/work-tracker

--->