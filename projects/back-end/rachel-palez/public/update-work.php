<?php 

    // include the config file
    require "../config.php";

    //include the common file
    require "common.php";

 // run when submit button is clicked
    if (isset($_POST['submit'])) {
        try {
            $connection = new PDO($dsn, $username, $password, $options);  
            
            //grab elements from form and set as varaible
            $work =[
              "id" => $_POST['id'],
              "task" => $_POST['task'],
              "task_group"  => $_POST['task_group'],
              "due_date"   => $_POST['due_date'],
              "date"   => $_POST['date'],
            ];
            
            // create SQL statement
            $sql = "UPDATE `task_listing` 
                    SET id = :id, 
                        task = :task, 
                        task_group = :task_group, 
                        due_date = :due_date,
                        date = :date 
                    WHERE id = :id";
            //prepare sql statement
            $statement = $connection->prepare($sql);
            
            //execute sql statement
            $statement->execute($work);
        } catch(PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
    }



    //simple if/else statement to check if the id is available
    if (isset($_GET['id'])) {
        //yes the id exists 
        try {
            // standard db connection
            $connection = new PDO($dsn, $username, $password, $options);
            
            // set if as variable
            $id = $_GET['id'];
            
            //select statement to get the right data
            $sql = "SELECT * FROM task_listing WHERE id = :id";
            
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

        
        
        // quickly show the id on the page
        //echo $_GET['id'];
        
    } else {
        // no id, show error
        echo "No id - something went wrong";
        //exit;
    }


?>

<?php 
include "templates/header.php"; 
include "../public/body.php"; 
include "../public/logout-block.php";
?>

<div class="row">
    <div class="col-md-4">
        <h2>Edit your task</h2>
    </div>
    
    <div class="col-md-8">
        <form method="post">
            
        <div class="form-group id">
        <label for="id"><p>Task number:</p></label>
        <input type="text" name="id" id="id" class="form-control" value="<?php echo escape($work['id']); ?>" >
        </div>

        <div class="form-group">
        <label for="task"><p>Task:</p></label>
        <input type="text" name="task" id="task" class="form-control" value="<?php echo escape($work['task']); ?>">
        </div>    

         <div class="form-group">
         <label for="task_group"><p>Task group:</p></label>
        <input type="text" name="task_group" id="task_group" class="form-control" value="<?php echo escape($work['task_group']); ?>">
        </div>

        <div class="form-group">
        <label for="due_date"><p>Due Date</p></label>
        <input type="text" name="due_date" id="due_date" class="form-control" value="<?php echo escape($work['due_date']); ?>">
        </div>

        <div class="form-group">
        <input type="submit" name="submit" class="btn btn-outline-info" value="Save">
        </div>

        <div class="form-group">
        <a href="read.php"><button type="button" class="btn btn-outline-info otherbtn">Go back</button></a>   
        </div>

        </form>
        
    </div>    

    
</div>

<div class="row registered-main"></div>
    
<?php 
include "templates/footer.php";
?>