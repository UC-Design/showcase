<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Login';
?>
<nav id="navigation" title="Navigation"> 
    <h4 id="navHeading">Navigation</h4>
    <ul id="navList">
        <li>
            <a href="index.php?r=site/index" title="Home">Home</a>
        </li>
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
<main id="mainContent">
    <div id="centerLogin">
        <h2>Log into Fuel Watch</h2>
        <?php $form = ActiveForm::begin(['id' => 'login']); ?>
            <div id="username">
                <div class='fieldstyle'>
                    <label>Username</label>
                    <input type="text" name="username" required>
                </div>
            </div>
            <div id="password">
                <div class='fieldstyle'>
                    <label>Password</label>
                    <input type="text" name="password" required>
                </div>
            </div>
            <button name="login">LOGIN</button>
        <?php ActiveForm::end(); ?>
        <section id="loginStatus">
        <p><?php echo $login_status; ?></p>
        </section>
    </div>
</main>