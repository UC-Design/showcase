<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Profile';
?>

<nav id="navigation" title="Navigation"> 
        <h4 id="navHeading">Navigation</h4>
        <ul id="navList">
                <li>
                    <a href="index.php?r=site/index" title="Home">Home</a>
                </li>
                <?php 
                    if(!empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/logout' title='Logout'>Logout</a></li>";
                    }  
                ?>
        </ul>
</nav>
<main id="mainContent" title="mainContent">
    <div id="centerprofile">
        <div id="deleteprofile">
            <h2>User<?php echo ": ".$_SESSION['username'] ?></h2>
            <button title="Delete Account" type="button"><a href="index.php?r=site/unregister">Delete Account</a></button>
        </div>
        <section id="favourite">
            <?php $form = ActiveForm::begin(['id' => 'profile']); ?>
                        <h3>Favourite</h3>
                        <div id="setfavourite">
                            <label>Fuel Type:</label>
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
                                        else {
                                            if($fuel_type == $user->postedfuel()) {
                                               echo "<option value='$fuel_type' selected>" . $fuel_type . "</option>"; 
                                            }
                                            else {
                                                echo "<option value='$fuel_type'>" . $fuel_type . "</option>";
                                            }
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
                                        else {
                                            if($locality_name == $user->postedlocalityname()) {
                                                echo "<option value='$locality_name' selected>" . $locality_name . "</option>";
                                            }
                                            else {
                                                echo "<option value='$locality_name'>" . $locality_name . "</option>";
                                            }
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
                                        else {
                                             if($distance == $user->posteddistance()) {
                                                echo "<option value='$distance' selected>" . $distance . "</option>";
                                            }
                                            else {
                                                echo "<option value='$distance'>" . $distance . "</option>";
                                            }
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
                <input type="submit" value="Submit Favourite" name="profile">
            <?php ActiveForm::end(); ?>
        </section>
    </div>
</main>
