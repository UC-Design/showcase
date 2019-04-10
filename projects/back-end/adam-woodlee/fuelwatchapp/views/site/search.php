<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Home';
?>
<nav id="navigation" title="Navigation"> 
        <h4 id="navHeading">Navigation</h4>
        <ul id="navList">
                <?php 
                    if(empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/login' title='Login'>Login</a></li>";
                    }  
                ?>
                <?php 
                    if(!empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/logout' title='Logout'>Logout</a></li>";
                    }  
                ?>
                <?php 
                    if(empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/register' title='Register'>Register</a></li>";
                    }  
                ?>
                <?php 
                    if(!empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/profile' title='Profile'>".$_SESSION['username']."</a></li>";
                    }  
                ?>
        </ul>
</nav>
<main id="mainContent" title="mainContent">
    <div id="centersearch">
        <section id="fuelsearch">
                <?php $form = ActiveForm::begin(['id' => 'index']); ?>
                        <div id="searchfuel">
                            <label>Fuel:</label>
                            <select name="fuel">
                                <?php 
                                $fuel_types = $user->getfueltypes();
                                    foreach($fuel_types as $fuel_type) {
                                        if($_SERVER["REQUEST_METHOD"] == "POST" && $user->verifiedinput()) {
                                            if($fuel_type == $user->postedfuel()) {
                                               echo "<option value='$fuel_type' selected>" . $fuel_type . "</option>"; 
                                            }
                                            else {
                                                echo "<option value='$fuel_type'>" . $fuel_type . "</option>";
                                            }
                                        }
                                        else if($user->favourite){
                                                if($fuel_type == $user->postedfuel()) {
                                                    echo "<option value='$fuel_type' selected>" . $fuel_type . "</option>"; 
                                                }
                                            else {
                                                echo "<option value='$fuel_type'>" . $fuel_type . "</option>";
                                            }
                                        }
                                        else {
                                            echo "<option value='$fuel_type'>" . $fuel_type . "</option>";
                                        }
                                    }
                                ?>
                            </select>
                                <?php 
                                    if($_SERVER["REQUEST_METHOD"] == "POST" && !($user->verifiedfueltype())) {
                                            echo "<p>Error: ". $user->postedfuel() . " is not recognised.</p>";
                                        }
                                ?>
                        </div>
                        <div id="searchtown">
                            <label>Town:</label>
                            <select name="locality_name">
                                <?php 
                                  $locality_names = $user->getlocalitynames();
                                    foreach($locality_names as $locality_name) {
                                        if($_SERVER["REQUEST_METHOD"] == "POST" && $user->verifiedinput()) {
                                            if($locality_name == $user->postedlocalityname()) {
                                                echo "<option value='$locality_name' selected>" . $locality_name . "</option>";
                                            }
                                            else {
                                                echo "<option value='$locality_name'>" . $locality_name . "</option>";
                                            }
                                        }
                                        else if($user->favourite){
                                                if($locality_name == $user->postedlocalityname()) {
                                                    echo "<option value='$locality_name' selected>" . $locality_name . "</option>"; 
                                                }
                                            else {
                                                echo "<option value='$locality_name'>" . $locality_name . "</option>";
                                            }
                                        }
                                        else {
                                            echo "<option value='$locality_name'>" . $locality_name . "</option>";
                                        }
                                    }
                                ?>
                            </select>
                                <?php 
                                    if($_SERVER["REQUEST_METHOD"] == "POST" && !($user->verifiedlocality())) {
                                            echo "<p>Error: ". $user->postedlocality() . " is not recognised.</p>";
                                        }
                                ?>
                        </div>
                        <div id="searchdistance">
                            <label>Distance(km):</label>
                            <select name="distance">
                                <?php 
                                  $distances = $user->getdistances();
                                    foreach($distances as $distance) {
                                        if($_SERVER["REQUEST_METHOD"] == "POST" && $user->verifieddistance()) {
                                            if($distance == $user->posteddistance()) {
                                                echo "<option value='$distance' selected>" . $distance . "</option>";
                                            }
                                            else {
                                                echo "<option value='$distance'>" . $distance . "</option>";
                                            }
                                        }
                                        else if($user->favourite){
                                                if($distance == $user->posteddistance()) {
                                                    echo "<option value='$distance' selected>" . $distance . "</option>"; 
                                                }
                                            else {
                                                echo "<option value='$distance'>" . $distance . "</option>";
                                            }
                                        }
                                        else {
                                            echo "<option value='$distance'>" . $distance . "</option>";
                                        }
                                    }
                                ?>
                            </select>
                                <?php 
                                    if($_SERVER["REQUEST_METHOD"] == "POST" && !($user->verifieddistance())) {
                                            echo "<p>Error: ". $user->posteddistance() . " is not recognised.</p>";
                                        }
                                ?>
                        </div>
                <input type="submit" value="Submit Query" name="home">
            <?php ActiveForm::end(); ?>
        </section>
        <section id="stationdisplay">
            <p>Result: 
            <?php 
                if($user->cheapest_fuel) {
                    echo "Cheapest fuel in Western Australia for date: ".$user->cheapestdate();
                }
                else {
                    echo " ".$user->postedfuel().", ".$user->posteddistance()." km's from ".$user->postedlocalityname().".";
                }
            ?></p>
            <?php
                $fuel_search_view = $user->fuelsearchview();
                if(($fuel_search_view->getroot()) == null) {
                    echo "<div id='noresults'><p>NO RESULTS</p></div>";
                }
                else {
                    echo "<ul id='searchresults'>";
                    $node = $fuel_search_view->getroot();
                     echo "<li>";
                            echo "<ul class='searchresultitem'>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Title: </label>";
                                    if($node->getdata()->gettitle() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->gettitle()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Trading Name:</label>";
                                    if($node->getdata()->gettradingname() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->gettradingname()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Location: </label>";
                                    if($node->getdata()->getlocation() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlocation()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Phone: </label>";
                                    if($node->getdata()->getphone() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getphone()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Latitude: </label>";
                                    if($node->getdata()->getlatitude() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlatitude()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Longitude: </label>";
                                    if($node->getdata()->getlongitude() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlongitude()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Address: </label>";
                                    if($node->getdata()->getaddress() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getaddress()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Product: </label>";
                                    if($node->getdata()->getproduct() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getproduct()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Date: </label>";
                                    if($node->getdata()->getdate_() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getdate_()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Price: </label>";
                                    if($node->getdata()->getprice() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getprice()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    $lat = floatval($node->getdata()->getlatitude());
                                    $long = floatval($node->getdata()->getlongitude());
                                    echo "<button type='button'><a target='_blank' href='http://maps.google.com/maps?q=$lat,$long'><span>Show On Map</span></a></button>";
                                echo "</div>";
                            echo "</ul>";
                        echo "</li>";
                    while($node->getnextnode() != null) {
                        $node = $node->getnextnode();
                        echo "<li>";
                            echo "<ul class='searchresultitem'>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Title: </label>";
                                    if($node->getdata()->gettitle() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->gettitle()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Trading Name:</label>";
                                    if($node->getdata()->gettradingname() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->gettradingname()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Location: </label>";
                                    if($node->getdata()->getlocation() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlocation()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Phone: </label>";
                                    if($node->getdata()->getphone() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getphone()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Latitude: </label>";
                                    if($node->getdata()->getlatitude() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlatitude()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Longitude: </label>";
                                    if($node->getdata()->getlongitude() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getlongitude()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Address: </label>";
                                    if($node->getdata()->getaddress() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getaddress()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Product: </label>";
                                    if($node->getdata()->getproduct() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getproduct()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Date: </label>";
                                    if($node->getdata()->getdate_() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getdate_()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    echo "<label>Price: </label>";
                                    if($node->getdata()->getprice() == "") {
                                       echo "<li>N/A</li>"; 
                                    }
                                    else {
                                       echo "<li>".$node->getdata()->getprice()."</li>"; 
                                    }
                                echo "</div>";
                                echo "<div class='searchresultitemfield'>";
                                    $lat = floatval($node->getdata()->getlatitude());
                                    $long = floatval($node->getdata()->getlongitude());
                                    echo "<button type='button'><a target='_blank' href='http://maps.google.com/maps?q=$lat,$long'><span>Show On Map</span></a></button>";
                                echo "</div>";
                            echo "</ul>";
                        echo "</li>";
                    }
                echo "</ul>";
                } 
            ?>
        </section>
    </div>
</main>
