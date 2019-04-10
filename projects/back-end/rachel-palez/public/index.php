<?php 
include "templates/header.php"; ?>

  <div class="jumbotron text-center main">
      <h1>To-do List</h1>
</div>

<div class="row">

<div class="col text-right"><h1>? &nbsp; </h1>
</div>
    <div class="col"> 
    <h2>Always forgetting what you need to do?</h2>
    <p>With the to-do list let the work be done for you.</p> 
    <p>Add your hard to do tasks and watch them fall away as you go through your day.</p>
    <p>Sign up today!</p>
    <a href="register.php"><button type="button" class="btn btn-outline-info">Register</button></a>
    </div>

</div>

 <div class="row registered-main">
     <div class="col text-right">
     
        <h2>Already have an account?</h2>
        <p>Login to get back at it!</p>
        <br>
        <a href="login.php"><button type="button" class="btn btn-outline-info">Login</button></a>
     </div>
     
     <div class="col"><h1>&nbsp;! </h1>
     </div>
          
</div>  
        
<?php
include "templates/footer.php"; ?>
