<?php 

	
    // include the config file
    require "../config.php"; 
    
    // this is called a try/catch statement 
	try {
        // FIRST: Connect to the database
        $connection = new PDO($dsn, $username, $password, $options);
		
        // SECOND: Create the SQL 
        $sql = "SELECT * FROM task_listing ORDER BY due_date";
        
        // THIRD: Prepare the SQL
        $statement = $connection->prepare($sql);
        $statement->execute();
        
        // FOURTH: Put it into a $result object that we can access in the page
        $result = $statement->fetchAll();
	} catch(PDOException $error) {
        // if there is an error, tell us what it is
		echo $sql . "<br>" . $error->getMessage();
	}	

?>


<?php include "templates/header.php"; 
include "../public/body.php";
include "../public/logout-block.php";
?>


<?php  

        //if there are some results
        if ($result && $statement->rowCount() > 0) { ?>

<div class="row welcome">
    <div class="col">
    <h2>Tasks</h2>    
        <p><a href="create.php">+ Add a new task</a></p>
    
    </div>

</div>


<?php 
                // This is a loop, which will loop through each result in the array
                foreach($result as $row) { 
?>
<div class="row tasks">
    <div class="col-md-8 text-center">
        <h3><?php echo $row['task']; ?></h3>
         <p class="caps">Due Date:<?php echo $row['due_date']; ?></p>
    </div>
    <div class="col-md-2 text-center">
        <p>
    <?php echo $row['task_group']; ?>
        </p>
    </div>
    <div class="col">
        <p><a href='update-work.php?id=<?php echo $row['id']; ?>'>Edit</a><br>
    <a href='delete.php?id=<?php echo $row['id']; ?>'>Delete</a></p>
    </div>
      
</div>


<?php }; //close the foreach
        }; 
?>


<?php include "templates/footer.php"; ?>