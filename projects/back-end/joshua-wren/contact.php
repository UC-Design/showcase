<!--href="http://www.freecontactform.com/email_form.php">Email Form</a> -->
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
        <div class="colContainerContact">
            <div class="col1">
                <h2>Say Hi!</h2>

                <p>Please feel free to contact us regarding general feedback and any site issues.</p>

                <p>As the website is quite new, we welcome your feedback which will contribute to developing the website further.</p>

                <p>We will endeavour to monitor members posts regularly to ensure content is kept appropriate and professional, however we would appreciate your feedback regarding posts that you feel are inappropriate.
                </p>
                <br>
                <br>
                <div class="form-group">
                    <form name="contactform" method="post" action="send_form_email.php">

                        <label for="first_name">First Name</label>
                        <input type="text" name="first_name" id="first_name" class="form-control">

                        <label for="last_name"> Last Name</label>
                        <input type="text" name="last_name" id="last_name" class="form-control">

                        <label for="email"> Email Address *</label>
                        <input type="email" name="email" id="email" class="form-control" required>

                        <label for="telephone"> Phone number</label>
                        <input type="number" name="telephone" id="number" class="form-control">

                        <label for="comments">Comments *</label>
                        <textarea class="form-control" name="comments" rows="5" id="comments" required></textarea>

                        <input type="submit" value="Submit" class="btn btn-primary">
                    </form>
                </div>
            </div>

            <div class="col2">
                <img src="assets/images/88-below-1198412-unsplash.jpg" alt="Car club image" class="contentImage" />
            </div>
        </div>
    </div>
    <?php include "templates/footer.php"; ?>
</div>

</html>