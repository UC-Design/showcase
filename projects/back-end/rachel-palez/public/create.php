<?php 
// this code will only execute after the submit button is clicked
if (isset($_POST['submit'])) {
	
    // include the config file that we created before
    require "../config.php"; 
    
    // this is called a try/catch statement 
	try {
        // FIRST: Connect to the database
        $connection = new PDO($dsn, $username, $password, $options);
		
        // SECOND: Get the contents of the form and store it in an array
        $new_work = array( 
            "task" => $_POST['task'], 
            "task_group" => $_POST['task_group'],
            "due_date" => $_POST['due_date']
        );
        
        // THIRD: Turn the array into a SQL statement
        $sql = "INSERT INTO task_listing (task, task_group, due_date) VALUES (:task, :task_group, :due_date)";        
        
        // FOURTH: Now write the SQL to the database
        $statement = $connection->prepare($sql);
        $statement->execute($new_work);
	} catch(PDOException $error) {
        // if there is an error, tell us what it is
		echo $sql . "<br>" . $error->getMessage();
	}	
}
?>


<?php include "templates/header.php"; 
include "../public/body.php"; 
include "../public/logout-block.php" ?>

<?php if (isset($_POST['submit']) && $statement) { ?>
<div class="row welcome">
    <div class="col"><p>Task successfully added. <a href="read.php">Go back to task page.</a></p></div>
</div>

<?php } ?>

<div class="row welcome">

    <div class="col-md-4">  
        <h2>Add a new task</h2>
    </div>

    <div  class="col-md-8">
        <form method="post">
        <div class="form-group">
            <label for="task"><p>Task:</p></label>
            <input type="text" name="task" class="form-control" id="task">
        </div>
    
        <div class="form-group">
            <label for="task_group"><p>Task Group:</p></label>
            <input type="text" name="task_group" class="form-control" id="task_group">
        </div>
            
        <div class="form-group">
            <label for="due_date"><p>Due Date:</p></label>
            <input type="text" name="due_date" class="form-control" id="due_date">
        </div>
            
        <div class="form-group">
            <input type="submit" name="submit" class="btn btn-outline-info" value="Save">
        </div>

    </form>
    </div>
</div>

<div class="row registered-main"></div>

<?php include "templates/footer.php"; ?>