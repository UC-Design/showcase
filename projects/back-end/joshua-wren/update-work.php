<?php 
    // include the config file that we created last week
    require "config-details.php";
    require "common.php";
    // run when submit button is clicked
    if (isset($_POST['submit'])) {
        try {
            $connection = new PDO($dsn, $username, $password, $options);  
            
            //grab elements from form and set as varaible
            $show_log =[
              "id"         => $_POST['id'],
              "title" => $_POST['title'], 
            "description" => $_POST['description'],
            "event_date" => $_POST['event_date'],
            "location" => $_POST['location'], 
            "parking" => $_POST['parking'], 
            "entry_fees" => $_POST['entry_fees'], 
            "spectator_fees" => $_POST['spectator_fees'], 
            "other_detail" => $_POST['other_detail'], 
              "date"   => $_POST['date'],
            ];
            
            // create SQL statement
            $sql = "UPDATE `show_log` 
                    SET id = :id, 
                        title = :title, 
                        description = :description, 
                        event_date = :event_date, 
                        location = :location, 
                        parking = :parking, 
                        entry_fees = :entry_fees, 
                        spectator_fees = :spectator_fees, 
                        other_detail = :other_detail, 
                        date = :date 
                    WHERE id = :id";
            //prepare sql statement
            $statement = $connection->prepare($sql);
            
            //execute sql statement
            $statement->execute($show_log);
        } catch(PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
    }
    // GET data from DB
    //simple if/else statement to check if the id is available
    if (isset($_GET['id'])) {
        //yes the id exists 
        
        try {
            // standard db connection
            $connection = new PDO($dsn, $username, $password, $options);
            
            // set if as variable
            $id = $_GET['id'];
            
            //select statement to get the right data
            $sql = "SELECT * FROM show_log WHERE id = :id";
            
            // prepare the connection
            $statement = $connection->prepare($sql);
            
            //bind the id to the PDO id
            $statement->bindValue(':id', $id);
            
            // now execute the statement
            $statement->execute();
            
            // attach the sql statement to the new work variable so we can access it in the form
            $work = $statement->fetch(PDO::FETCH_ASSOC);
            
        } catch(PDOExcpetion $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
    } else {
        // no id, show error
        echo "No id - something went wrong";
        //exit;
    };
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
                <li class="active"><a href="update.php">Update a car show</a></li>
                <li><a href="delete.php">Delete a car show</a></li>
                <li><a href="contact.php">Contact us</a></li>
            </ul>
        </nav>
    </header>
    <!------------------------MAIN NAV DIV end------------------------->

    <div class="contentContainer">

        <?php if (isset($_POST['submit']) && $statement) : ?>
        <h4>Work successfully updated.</h4>
        <?php endif; ?>

        <h2>Update a car show</h2>

        <div class="form-group">
            <form method="post">

                <label for="id">ID</label>
                <input type="text" name="id" id="id" class="form-control" value="<?php echo escape($show_log['id']); ?>">

                <label for="title">Title</label>
                <input type="text" name="title" id="title" class="form-control" value="<?php echo escape($show_log['title']); ?>">

                <label for="description">Description</label>
                <textarea type="text" name="description" id="description" class="form-control" rows="5" value="<?php echo escape($show_log['description']); ?>"></textarea>

                <label for="event_date">Date/s</label>
                <input type="text" name="event_date" id="event_date" class="form-control" value="<?php echo escape($show_log['event_date']); ?>">

                <label for="location">Location</label>
                <input type="text" name="location" id="location" class="form-control" value=" <?php echo escape($show_log['location']); ?>">

                <label for="parking">Parking details</label>
                <input type="text" name="parking" id="parking" class="form-control" value="<?php echo escape($show_log['parking']); ?>">

                <label for="entry_fees">Entry fees</label>
                <input type="text" name="entry_fees" id="entry_fees" class="form-control" value="<?php echo escape($show_log['entry_fees']); ?>">

                <label for="spectator_fees">Spectator fees</label>
                <input type="text" name="spectator_fees" id="spectator_fees" class="form-control" value="<?php echo escape($show_log['spectator_fees']); ?>">

                <label for="other_detail">Other details</label>
                <textarea type="text" name="other_detail" id="other_detail" class="form-control" rows="5" value="<?php echo escape($show_log['other_detail']); ?>"></textarea>


                <input type="submit" name="submit" value="Save" class="btn btn-primary">

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