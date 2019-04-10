<?php
/*
This is the Controller for the fuealwatchapp. For each action there is some processing that is required in order to render the desired view. This processing occurrs in the processing functions. Generally, a request is processed and the $user variable is set to either null, an instance of FWAUser or FWARegisteredUser. The appropriate view is rendered according to whether the $user variable is null or not. See processing functions for more details on processing.
*/
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class SiteController extends Controller
{
    private $log = "/var/www/yiifuelwatchapp/log/fuelwatchapp.log";
    public $user;
    public $register_status;
    public $login_status;
    public $profile_status;

    public function actionIndex() {
        $this->processuserrequest();
        return $this->render('search', ['user' => $this->user]);
    }
    public function actionRegister() {
        $this->processuserregisterrequest();
        if($this->user == null) {
            return $this->render('register', ['register_status' => $this->register_status]);
        }
        else {
            $this->redirect('index');
        }
    }
    public function actionLogin() {
        $this->processuserloginrequest();
        if($this->user == null) {
            return $this->render('login', ['login_status' => $this->login_status]);
        }
        else {
            $this->redirect('index');
        }
    }
     public function actionProfile() {
        $this->processuserprofilerequest();
        if($this->user == null) {
            $this->redirect('index');
        }
        else {
            return $this->render('profile', ['user' => $this->user]);
        }
    }
    public function actionLogout()
    {
        $_SESSION['username'] = null;
        $this->redirect('index');
    }
    public function actionUnregister() {
        if(isset($_SESSION['username'])) {
            $user = new \app\models\FWARegisteredUser($this->log);
            $user->deleteaccount($this->log);
        }
        $this->redirect('index');
    }
    /*
    The processuserrequest() function is used to process a user request for the 'home' page. If the request is a http Get and the user is not registered then the first if cluse is executed. A FWAUser object is created and a query is executed to find the cheapest fuel for Western Australia for that particular day. The cheapest fuel data would be rendered in the home view. 
    
    If the request is a http POST the second then the second (else)if is executed. Note that whether registered or not, on http POST the second if clause will always be executed. This is because registered and non registered users can search the database.
    
    If the request is http GET and the user is registered then the third (else)if statement is executed. A FWARegisteredUser object is created. This would gather the data required to display the Registered Users 'favourite' query in the view on the home page. If there is no favourite then the $cheapest_fuel flag is set, so to display the cheapest fuel query. 
    */
    function processuserrequest() {
        try {
            if($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_SESSION['username'])) {
                $this->user = new \app\models\FWAUser($this->log);
                $this->user->cheapest_fuel = true;
            }
            else if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $this->user = new \app\models\FWAUser($this->log);
                $this->user->post();
            }
            else if(isset($_SESSION['username']) && $_SERVER["REQUEST_METHOD"] == "GET") {
                $this->user = new \app\models\FWARegisteredUser($this->log);
                $favourite_status = $this->user->getfavouriteitems();
                if(!($this->user->favourite())) {
                    $this->user->cheapest_fuel = true;
                }
                else {
                    $this->user->favourite = true;
                }
            }
        }
        catch (Exception $e) {
            header("Location: index.php"); 
            exit;
        }
    }
    /*
    The processuserregisterrequest() function is used to process a user request for the 'register' page. If the http request is for GET then $user is set to null. The result is that the registration view is rendered.
    
    If the http request is for POST a FWAUser object is instantiated and the register() function is called. This function does some data validation. If unsuccesful the user is notified. If successful the actionRegistration is redirected to actionIndex(), a FWAUser object is instantiated and initialised, and the user home view is displayed with the users username in the navigation bar.
    */
    function processuserregisterrequest() {
           try {
                if($_SERVER['REQUEST_METHOD'] == "POST") {
                    $user = new \app\models\FWAUser($this->log);
                    $this->register_status = $user->register();
                    if(isset($_SESSION['username'])) {
                        $this->user = new \app\models\FWARegisteredUser($this->log);
                        $this->user->getfavouriteitems();
                    }
                }
               else {
                   $user = null;
               }
            }
            catch (Exception $e) {
                exit;
            }
    }
    /*
    The processuserloginrequest() function is used to process a user request for the 'login' page. If the http request is for GET then $user is set to null. The result is that the login view is rendered.
    
    If the http request is for POST a FWAUser object is instantiated and the login() function is called. This function does some data validation. If unsuccesful the user is notified. If successful the actionLogin is redirected to actionIndex(), a FWAUser object is instantiated and initialised, and the user home view is displayed with the users username in the navigation bar. 
    */
    function processuserloginrequest() {
       try {
            if($_SERVER['REQUEST_METHOD'] == "POST") {
                $this->user = new \app\models\FWAUser($this->log);
                $this->login_status = $this->user->login();
                if(!(isset($_SESSION['username']))) {
                    $this->user = null;
                }
            }
            else {
                $this->user = null;
            }
        }
        catch (Exception $e) {
            exit;
        }
    }
    /*
    The processuserprofilerequest() function is used to process a user request for the 'profile' page. If the user requests this page and they aren't logged in, then $user is set to null and there is redirection to the home view. If the request is for http POST the Registered Usrers favourite is stored. If the request is for http GET then the Registered Usrers 'favourite'(if any) is retrieved for display.
    */
    function processuserprofilerequest() {
           try {
                if(!isset($_SESSION['username'])) {
                    $this->user = null;
                }
                else if($_SERVER['REQUEST_METHOD'] == "POST"){
                    $this->user = new \app\models\FWARegisteredUser($this->log);
                    $this->profile_status = $this->user->profilepost();
                }
                else {
                    $this->user = new \app\models\FWARegisteredUser($this->log);
                    $this->profile_status = $this->user->getfavourite();
                }
            }
            catch (Exception $e) {
                exit;
            }
    }
}
