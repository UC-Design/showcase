<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect them to the login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
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
                <li class="active"><a href="welcome.php">Home</a></li>
                <li><a href="create.php">Add a car show</a></li>
                <li><a href="read.php">See car shows</a></li>
                <li><a href="update.php">Update a car show</a></li>
                <li><a href="delete.php">Delete a car show</a></li>
                <li><a href="contact.php">Contact us</a></li>
            </ul>
        </nav>
    </header>
    <!------------------------MAIN NAV DIV end------------------------->

    <div class="contentContainer">
        <div class="content-header">
            <!--- This announces the users name along with "Welcome"--->
            <h1>Hi, <b>
                    <?php echo htmlspecialchars($_SESSION["username"]); ?></b>. <br>Welcome to Car Show Tracker Australia.</h1>
            <br>
            <!--- These are the Reset password and Sign out buttons directing you to either reset-password or index--->
            <p>
                <a href="reset-password.php" class="btn btn-danger">Reset Your Password</a>
                <a href="logout.php" class="btn btn-warning">Sign Out of Your Account</a>
            </p>
            <br>

            <div class="colContainer1">
                <div class="col1">
                    <img src="assets/images/alison-ivansek-784123-unsplash.jpg" alt="Car club image" class="contentImage" />
                </div>
                <div class="col2">
                    <h2> What this is</h2>
                    <p2>
                        Car Show Tracker Australia is for the ultimate car enthusiast. It is a website designed for members to post and track up-and-coming car shows nation wide. Our vision is to show support to car shows all around Australia, guaranteeing no car-loving fan to miss out on the fun!
                    </p2>
                </div>
            </div>

            <div class="colContainer2">
                <div class="col1">
                    <h2>Post a car show</h2>
                    <p2>
                        Members can post a car show through the ‘Add a car show’ page. There is no limit to the car shows a user may choose to post, though factual information is required as these posts will be made available for all members to see and enjoy.
                    </p2>
                </div>
                <div class="col2">
                    <img src="assets/images/james-kresser-1131299-unsplash.jpg" alt="Car club image" class="contentImage" />
                </div>
            </div>

            <div class="colContainer3">
                <div class="col1">
                    <img src="assets/images/jorn-sieveneck-187808-unsplash.jpg" alt="Car club image" class="contentImage" />
                </div>
                <div class="col2">
                    <h2>Tracking car shows</h2>
                    <p2>
                        All car shows that are posted are displayed on the ‘See car shows’ page. You can also edit or delete a post if the information is incorrect or cancelled.
                    </p2>
                </div>
            </div>

            <div class="colContainer4">
                <div class="col1">
                    <h2>Rules</h2>
                    <p2>
                        The rules are simple, no vulgar, derogative, sexist or negative language will be tolerated when posting shows. If members are identified to be displaying inappropriate or forbidden content, a warning will be issued and further misconducts will result in removal and banning from the group. We are all here for a good time.
                    </p2>
                </div>
                <div class="col2">
                    <img src="assets/images/alex-suprun-671922-unsplash.jpg" alt="Car club image" class="contentImage" />
                </div>
            </div>

            <div class="colContainer5">
                <div class="col1">
                    <img src="assets/images/dominik-lange-86965-unsplash.jpg" alt="Car club image" class="contentImage" />
                </div>
                <div class="col2">
                    <h2>Contact us</h2>
                    <p2>
                        If you wish to get in touch with us, please do so by submitting a contact form through the ‘Contact us’ page.
                        <br>
                        Please feel free to contact us regarding general feedback and any site issues.
                        <br>
                        As the website is quite new, we welcome your feedback which will contribute to developing the website further.
                        <br>
                        We will endeavour to monitor members posts regularly to ensure content is kept appropriate and professional, however we would appreciate your feedback regarding posts that you feel are inappropriate.</p2>
                </div>
            </div>
        </div>

    </div>

    <?php include "templates/footer.php"; ?>
</div>

</html>

<!--- CODE REFERENCE

Tutorial Republic. ‘PHP MySQL Login System’.
Online step by step tutorial.
https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

--->