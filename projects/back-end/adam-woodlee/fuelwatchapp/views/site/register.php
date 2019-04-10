<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Register';
?>
<nav id="navigation" title="Navigation"> 
        <h4 id="navHeading">Navigation</h4>
        <ul id="navList">
                <li>
                    <a href="index.php?r=site/index" title="Home">Home</a>
                </li>
                <?php 
                    if(empty($_SESSION['username'])) {
                        echo "<li><a href='index.php?r=site/login' title='Login'>Login</a></li>";
                    }  
                ?>
        </ul>
</nav>
<main id="mainContent">
    <div id="centerRegister">
        <h2>Register to Fuel Watch</h2>
        <?php $form = ActiveForm::begin(['id' => 'register']); ?>
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
            <button name="register">Register</button>
        <?php ActiveForm::end(); ?>
        <section id="registerStatus">
        <p><?php echo $register_status; ?></p>
        </section>
    </div>
</main>