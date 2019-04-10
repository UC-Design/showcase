<?php include "templates/header.php"; 
include "../public/body.php"; 
include "../public/logout-block.php"?>

<div class="row">

<div class="col-md-4 text-right"><h2>Rationale</h2></div>
<div class="col-md-8">
    <p>The to-do list app is inspired by modern day use websites.</p>
    <p>The look and feel is targeted towards the millennial population using white space, large fonts and minimal colours.</p>
    <p>The website takes on typical to-do list style application where a user can login, create tasks, edit them and delete.</p>
    <p>Due to time constraints, I would have liked to add more functionality such as a group task section, a done section, seperate login sessions and other add-on features.</p>
    <p>The development process was challenging as generally my strength is on the front-end of web development. Following through the tutorials provided I was able to gain an understanding of how databases and PHP is related.</p> 
    <p>Setting up the database I found interesting as I haven’t previously had any understanding of how this all works. This stage I found to be somewhat easier to understand with my prior knowledge of databases and how it’s a set of data that a server outputs into a browser to be told how to be styled.
    </p>
    <p>A struggle part for me was understanding the connections from PHP into the SQL database. The longest part of this assignment was setting up and understanding how that is all put together.</p>  
    <p>The other struggle was setting up a login system. This took a fair amount of time understanding how, what is password hashing and how a session connects and disconnects.</p> 
    <p>One of the biggest challenges was considering each feature I wished to add and the thinking process behind whether it should be done on the server side or client side. For example ordering the tasks by due date, initially I was planning to write jQuery to order by that field. After some research I discovered I could easily add the ordering by an SQL statement and adding in ORDER BY. This led me to consider that the best way to approach a task is to consider time spent vs reward once you have done research.</p>
    <p>Once I understand how powerful PHP is, i started to develop the pages using different PHP templates to sit in each page. Each one was dependent on its purpose, for example, I could create a seperate H1 on the home page and different H1 on every other page. I found it particularly difficult to get my mind out of the standard static website build to create pages that are dynamic in each section.</p>
    <p>Having a simple understanding of hosting and domains I was able to setup a live environment quite quickly. It was difficult to understand where all of the files go, however after doing research and creating new databases I was able to export from my local server to import to the hosted Infinity free environment.</p>

    
    
    
    
    
    </div>





</div>






<?php include "templates/footer.php"; ?>