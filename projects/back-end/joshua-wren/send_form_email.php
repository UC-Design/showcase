<?php
if(isset($_POST['email'])) {
 
    // Email send details along with the subject line
    $email_to = "joshuawren@outlook.com";
    $email_subject = "Email from Car Show Tracker Australia member";
 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
     
 
    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
 
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
  }
 
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
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
                <li><a href="delete.php">Delete a car show</a></li>
                <li class="active"><a href="contact.php">Contact us</a></li>
            </ul>
        </nav>
    </header>
    <!------------------------MAIN NAV DIV end------------------------->

    <div class="contentContainer">
        <h4>Thank you for contacting us. We will be in touch with you very soon.</h4>
    </div>

    <?php include "templates/footer.php"; ?>
</div>
</html>
<?php
}
?>

<!--- CODE REFERENCE

FreeContactForm. ‘Simple Form to Email PHP Contact Form’.
Online step by step tutorial.
https://www.freecontactform.com/email_form.php

--->