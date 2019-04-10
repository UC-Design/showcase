<?php
/*
FWAUser represents a User of the fuelwatchapp. A user can register(), login(), dbparametersearch() and getcheapestinWA(). There are some auxilary functions needed to perform these tasks.

Auxilary functions associated with login() and register() are validatepassword() and validateusername(). These check whether the posted data is within the allowable domains.

Auxilary functions associated with dbparametersearch() are:
1. querylocalitynames() - Queries available locality names from the database.
2. verifyposteddata() - Verifies that the posted data is within the allowable domains.
3. getstationsinrange() - Queries the database for stations within the range of the posted parameters.
4. distance() - Calculates the distance between the posted locality and a given station.(ref www.geodatasource.com)
5. justifyquerystring () - Modifies strings used in SQL. e.g. O'Conner wil be changed to O''Conner.

Auxilary functions associated with getcheapestinWA() are the same as those used for dbparametersearch().
*/
namespace app\models;
use Yii;
use yii\base\Model;

class FWAUser {
//<---------------------Fuel search get-------------------->
    protected $sql_locality_names;
    protected $fuel_types;
    protected $distances;
    protected $locality_names;
    protected $fuel_search_view;
    protected $cheapest_date;
//<---------------------Fuel search post-------------------->   
    protected $verified_input = false;
    protected $verified_locality = false;
    protected $verified_fuel_type = false;
    protected $verified_distance = false;
    protected $locality_name_index = 0;
    protected $locality_pid;
    protected $stations_within_distance_title;
    protected $posted_locality_name;
    protected $posted_fuel;
    protected $posted_distance;
    protected $log;
    public $cheapest_fuel = false;
    public $favourite = false;
    
    function __construct($log) {
        $this->sql_locality_names = "SELECT locality_name FROM wa_locality ORDER BY locality_name";
        $this->fuel_types = array("Unleaded", "Premium Unleaded", "Diesel", "Brand Diesel", "e85", "RON 98", "LPG");
        $this->distances = array("1" , "5", "10", "15", "20", "25", "30", "35","45", "50", "55", "60", "65", "100", "200", "300", "400", "500", "1000", "1500", "2000");
        $this->locality_names = array();
        $this->fuel_search_view = new LinkedList();
        $this->stations_within_distance_title = new LinkedList();
        $this->log = fopen($log, 'a');
        $this->querylocalitynames();
        $this->getcheapestinWA();
    }
    function post() {
        $this->fuel_search_view = new LinkedList();
        $this->verifyposteddata($_POST["locality_name"], $_POST["fuel"], $_POST["distance"]);
        $this->getstationsinrange();
        $this->dbparametersearch();
    }
    protected function querylocalitynames() {
        $locations = Yii::$app->db->createCommand($this->sql_locality_names)->queryAll();
        foreach($locations as $location) {
            array_push($this->locality_names, $location['locality_name']);
        }
    }
    function getlocalitynames () {
        return $this->locality_names;
    }
    function getfueltypes () {
        return $this->fuel_types;
    }
    function getdistances () {
        return $this->distances;
    }
     function verifiedinput() {
        return $this->verified_input;
    }
    function verifiedlocality() {
        return $this->verified_locality;
    }
    function verifiedfueltype() {
        return $this->verified_fuel_type;
    }
    function verifieddistance() {
        return $this->verified_distance;
    }
    function postedfuel() {
        return $this->posted_fuel;
    }
    function postedlocalityname() {
        return $this->posted_locality_name;
    }
    function posteddistance() {
        return $this->posted_distance;
    }
    function fuelsearchview() {
        return $this->fuel_search_view;
    }
    function cheapestdate() {
        return $this->cheapest_date;
    }
    function register() {
        $register_clash_query = "SELECT username FROM users WHERE ";
        $register_query = "INSERT INTO users (username, password, date_created) VALUES ";
        if(!empty($_POST['username']) && !empty($_POST['password'])) {
                    if($this->validateusername($_POST['username']) && $this->validatepassword($_POST['password'])) {
                        $register_clash_query .= "username = '".$_POST['username']."'";
                        $result = Yii::$app->db->createCommand($register_clash_query)->queryAll();
                        if($result) {
                            $date = date('m/d/Y h:i:s a', time());
                            if($this->log) {
                                fwrite($this->log, "Username: ".$_POST['username']." is taken ".$date."\n" );
                            }
                            return "Username is taken";
                        }
                        else {
                            $date = date('Y-m-d', time());
                            $register_query .= "('".$_POST['username']."' , '".$_POST['password']."', '".$date."')";
                            $result = Yii::$app->db->createCommand($register_query)->execute();
                            if($result){
                                $date = date('m/d/Y h:i:s a', time());
                                if($this->log) {
                                    fwrite($this->log, "Username: ".$_POST['username']." is registered ".$date."\n");
                                }
                            $_SESSION['username'] = $_POST['username'];
                            return "Registered: ".$_POST['username'];
                            }
                            else {
                                return "2: Error registering: contact admin.";
                            }
                        }
                    }
                    else {
                        $date = date('m/d/Y h:i:s a', time());
                        if($this->log) {
                            fwrite($this->log, "Invalid Username:".$_POST['username']." OR Invalid Password: ".$_POST['password']." ".$date."\n" );
                        }
                        return "Invalid username or password.<br>Username: 'a-z, A-Z, 1-9' is allowed<br>Password: 'a-z, A-Z, 1-9, !, @, #, $, %, ^, &, *' is allowed.";
                    }
            }
            else {
                return "Enter a username and password";
            }
        return "Error registering: contact admin.";
    }
    function login() {
        $login_query = "SELECT username, password FROM users WHERE ";
        if(!empty($_POST['username']) && !empty($_POST['password'])) { 
                    if($this->validateusername($_POST['username']) && $this->validatepassword($_POST['password'])) {
                        $login_query .= "username = '".$_POST['username']."' AND password = '".$_POST['password']."'";
                        $result = Yii::$app->db->createCommand($login_query)->queryOne();
                        if($result) {
                            
                            $date = date('m/d/Y h:i:s a', time());
                                    if($this->log) {
                                        fwrite($this->log, "Username:".$_POST['username']." logged in ".$date."\n" );
                                    }
                                    $_SESSION['username'] = $result['username'];
                                    return "Login success";
                        } 
                        else {
                            $date = date('m/d/Y h:i:s a', time());
                            if($this->log) {
                                fwrite($this->log, "Invalid Username:".$_POST['username']." OR Invalid Password: ".$_POST['password']." ".$date."\n");
                            }
                             return "Invalid username or password.<br>Username: 'a-z, A-Z, 1-9' is allowed<br>Password: 'a-z, A-Z, 1-9, !, @, #, $, %, ^, &, *' is allowed.";
                        }
                    }
                    else {
                       return "Password or login format error.";
                    }
        }
        else {
            return "Enter username and password";
        }
        return "Error logging in: contact admin.";
    }
    private function validatepassword($password) {
        $password_as_array = str_split($password);
        if(sizeof($password_as_array) > 100) { return false; }
        foreach($password_as_array as $char) {
            $char = ord($char);
            if(!(($char >= 97 && $char <= 122) || ($char >= 65 && $char <= 90) || ($char >= 48 && $char <= 57) && ($char >= 33 && $char <= 47) )) {
                return false;   
            }
        }
        return true;
    }
    private function validateusername($username) {
        $username_as_array = str_split($username);
        if(sizeof($username_as_array) > 100) { return false; }
        foreach($username_as_array as $char) {
            $char = ord($char);
            if(!(($char >= 97 && $char <= 122) || ($char >= 65 && $char <= 90) || ($char >= 48 && $char <= 57) )) {
                return false;   
            }
        }
        return true;
    }
    protected function verifyposteddata($unverified_locality_name, $unverified_fuel, $unverified_distance) {
        foreach($this->locality_names as $locality_name) {
            if($locality_name == $unverified_locality_name) {
                $this->posted_locality_name = $unverified_locality_name;
                $this->verified_input = true;
                $this->verified_locality = true;
                $sql_pid = "SELECT locality_pid FROM wa_locality WHERE locality_name = '".$locality_name."'";
                $wa_locality = Yii::$app->db->createCommand($sql_pid)->queryOne();
                $this->locality_pid = $wa_locality['locality_pid'];
                break;
            }
            else {
                $this->posted_locality_name = $unverified_locality_name;
                $this->verified_input = false;
            }
            $this->locality_name_index++;
        }
        foreach($this->fuel_types as $fuel) {
            if($fuel == $unverified_fuel) {
                $this->posted_fuel = $unverified_fuel;
                $this->verified_input = true;
                $this->verified_fuel_type = true;
                break;
            }
            else {
                $this->posted_fuel = $unverified_fuel;
                $this->verified_input = false;
            }
        }
        foreach($this->distances as $distance) {
            if($distance == $unverified_distance) {
                $this->posted_distance = $unverified_distance;
                $this->verified_input = true;
                $this->verified_distance = true;
                break;
            }
            else {
                $this->posted_distance = $unverified_distance;
                $this->verified_input = false;
            }
        }
    }
    protected function getstationsinrange() {
            if($this->verified_input) {
//<-----------Get lat/long of locality---------------->
                $sql_locality_pid = "SELECT latitude, longitude FROM wa_locality_point WHERE locality_pid = '".$this->locality_pid."'";
                $result = Yii::$app->db->createCommand($sql_locality_pid)->queryAll();
                foreach($result as $row) {
                    $lat = floatval($row['latitude']);
                    $long = floatval($row['longitude']);
                }
//<--Compare selected lat/long with each station. Store the name(pk) of the station to make next query.------->
                        $sql_station_latlongtitle = "SELECT latitude, longitude, title FROM Stations";
                        $result = Yii::$app->db->createCommand($sql_station_latlongtitle)->queryAll();
                        foreach($result as $row) {
                            $station_lat = floatval($row['latitude']);
                            $station_long = floatval($row['longitude']);
                            $dist = $this->distance($lat, $long, $station_lat , $station_long , "K");
                            if($dist <= floatval($this->posted_distance)) {
                                $node = new LinkedListNode($row['title']);
                                $this->stations_within_distance_title->append($node);
                            }
                        }
                }
            }
//<-----------------https://www.geodatasource.com/developers/php--------------------->
        protected function distance($lat1, $lon1, $lat2, $lon2, $unit) {
          if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
          }
          else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == "K") {
              return ($miles * 1.609344);
            } else if ($unit == "N") {
              return ($miles * 0.8684);
            } else {
              return $miles;
            }
          }
        }
        protected function dbparametersearch() {
            $result;
            $sql_search;
            $date = date('Y-m-d');
            $sql_date_exists = "SELECT date FROM ulp WHERE date = '".$date."'";
            $result = Yii::$app->db->createCommand($sql_date_exists)->queryAll();
                if(sizeof($result) == 0) {
                    $date = date('Y-m-d', time() - (1 * 24 * 60 * 60));
                }
            if($this->verified_input && (($node = $this->stations_within_distance_title->getroot()) != null)) {
                switch ($this->posted_fuel) {
                    case "Unleaded":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ulp.product, ulp.brand, ulp.date, ulp.price FROM Stations, ulp WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND ulp.title = '" .$title. "' AND ulp.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                        $node = $node->getnextnode();
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= " OR (Stations.title = '" .$title. "' AND ulp.title = '" .$title. "' AND ulp.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY ulp.price ASC";
                        break;
                    case "Premium Unleaded":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ulpp.product, ulpp.brand, ulpp.date, ulpp.price FROM Stations, ulpp WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND ulpp.title = '" .$title. "' AND ulpp.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                        $node = $node->getnextnode();
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= " OR (Stations.title = '" .$title. "' AND ulpp.title = '" .$title. "' AND ulpp.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY ulpp.price ASC";
                        break;
                    case "Diesel":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, diesel.product, diesel.brand, diesel.date, diesel.price FROM Stations, diesel WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND diesel.title = '" .$title. "' AND diesel.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                            $node = $node->getnextnode();
                            $title = $this->justifyquerystring($node->getdata());
                            $sql_search .= " OR (Stations.title = '" .$title. "' AND diesel.title = '" .$title. "' AND diesel.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY diesel.price ASC";
                    break;
                    case "Brand Diesel":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, dieselbrand.product, dieselbrand.brand, dieselbrand.date, dieselbrand.price FROM Stations, dieselbrand WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND dieselbrand.title = '" .$title. "' AND dieselbrand.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                            $node = $node->getnextnode();
                            $title = $this->justifyquerystring($node->getdata());
                            $sql_search .= " OR (Stations.title = '" .$title. "' AND dieselbrand.title = '" .$title. "' AND dieselbrand.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY dieselbrand.price ASC";
                    break;
                    case "e85":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, e85.product, e85.brand, e85.date, e85.price FROM Stations, e85 WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND e85.title = '" .$title. "' AND e85.date = '".$date."') ";

                        while($node->getnextnode() != null) {
                            $node = $node->getnextnode();
                            $title = $this->justifyquerystring($node->getdata());
                            $sql_search .= " OR (Stations.title = '" .$title. "' AND e85.title = '" .$title. "' AND e85.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY e85.price ASC";
                    break;
                    case "RON 98":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ron98.product, ron98.brand, ron98.date, ron98.price FROM Stations, ron98 WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND ron98.title = '" .$title. "' AND ron98.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                            $node = $node->getnextnode();
                            $title = $this->justifyquerystring($node->getdata());
                            $sql_search .= " OR (Stations.title = '" .$title. "' AND ron98.title = '" .$title. "' AND ron98.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY ron98.price ASC";
                        break;
                    case "LPG":
                        $sql_search = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, lpg.product, lpg.brand, lpg.date, lpg.price FROM Stations, lpg WHERE ";
                        $title = $this->justifyquerystring($node->getdata());
                        $sql_search .= "(Stations.title = '" .$title. "' AND lpg.title = '" .$title. "' AND lpg.date = '".$date."') ";
                        while($node->getnextnode() != null) {
                            $node = $node->getnextnode();
                            $title = $this->justifyquerystring($node->getdata());
                            $sql_search .= " OR (Stations.title = '" .$title. "' AND lpg.title = '" .$title. "' AND lpg.date = '".$date."')";
                        }
                        $sql_search .= " ORDER BY lpg.price ASC";
                        break;
                }
                $result = Yii::$app->db->createCommand($sql_search)->queryAll();
                foreach($result as $row) {
                    $search_item = new SearchItem;
                    $search_item->puttitle($row['title']);
                    $search_item->puttradingname($row['trading_name']);
                    $search_item->putlocation($row['location']);
                    $search_item->putphone($row['phone']);
                    $search_item->putlatitude($row['latitude']);
                    $search_item->putlongitude($row['longitude']);
                    $search_item->putaddress($row['address']);
                    $search_item->putproduct($row['product']);
                    $search_item->putdate_($row['date']);
                    $search_item->putprice($row['price']);
                    $node = new LinkedListNode($search_item);
                    $this->fuel_search_view->append($node);
                }
            }
        }
        private function justifyquerystring ($query_string) {
            $split_string = str_split($query_string);
            $justified_string = ""; 
            for($x = 0; $x < sizeof($split_string); $x++) {
                if($split_string[$x] == "'") {
                    $justified_string .= "'";
                }
                $justified_string .= $split_string[$x]; 
            }
        return $justified_string;
        }
        protected function getcheapestinWA() {
            $search_item;
            $date = date('Y-m-d');
            $this->cheapest_date = $date;
            $sql_date_exists = "SELECT date FROM ulp WHERE date = '".$date."'";
            $result = Yii::$app->db->createCommand($sql_date_exists)->queryAll();
            if(sizeof($result) == 0) {
                $date = date('Y-m-d', time() - (1 * 24 * 60 * 60));
                    $this->cheapest_date = $date;
            }
            $sql_cheapest_ulp = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ulp.product, ulp.brand, ulp.date, ulp.price FROM Stations, ulp WHERE Stations.title = ulp.title AND ulp.date = '".$date."' AND ulp.price = (SELECT MIN(price) FROM ulp WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_ulp)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_ulpp = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ulpp.product, ulpp.brand, ulpp.date, ulpp.price FROM Stations, ulpp WHERE Stations.title = ulpp.title AND ulpp.date = '".$date."' AND ulpp.price = (SELECT MIN(price) FROM ulpp WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_ulpp)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_diesel = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, diesel.product, diesel.brand, diesel.date, diesel.price FROM Stations, diesel WHERE Stations.title = diesel.title AND diesel.date = '".$date."' AND diesel.price = (SELECT MIN(price) FROM diesel WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_diesel)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_dieselbrand = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, dieselbrand.product, dieselbrand.brand, dieselbrand.date, dieselbrand.price FROM Stations, dieselbrand WHERE Stations.title = dieselbrand.title AND  dieselbrand.date = '".$date."' AND dieselbrand.price = (SELECT MIN(price) FROM dieselbrand  WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_dieselbrand)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_e85 = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, e85.product, e85.brand, e85.date, e85.price FROM Stations, e85 WHERE Stations.title = e85.title AND e85.date = '".$date."' AND e85.price = (SELECT MIN(price) FROM e85  WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_e85)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_ron98 = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, ron98.product, ron98.brand, ron98.date, ron98.price FROM Stations, ron98 WHERE Stations.title = ron98.title AND ron98.date = '".$date."' AND ron98.price = (SELECT MIN(price) FROM ron98  WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_ron98)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
            $sql_cheapest_lpg = "SELECT Stations.title, Stations.trading_name, Stations.location, Stations.phone, Stations.latitude, Stations.longitude, Stations.address, lpg.product, lpg.brand, lpg.date, lpg.price FROM Stations, lpg WHERE Stations.title = lpg.title AND lpg.date = '".$date."' AND lpg.price = (SELECT MIN(price) FROM lpg  WHERE date = '".$date."') ";
            $result = Yii::$app->db->createCommand($sql_cheapest_lpg)->queryAll();
            foreach($result as $row) {
                $search_item = new SearchItem;
                $search_item->puttitle($row['title']);
                $search_item->puttradingname($row['trading_name']);
                $search_item->putlocation($row['location']);
                $search_item->putphone($row['phone']);
                $search_item->putlatitude($row['latitude']);
                $search_item->putlongitude($row['longitude']);
                $search_item->putaddress($row['address']);
                $search_item->putproduct($row['product']);
                $search_item->putdate_($row['date']);
                $search_item->putprice($row['price']);
                $node = new LinkedListNode($search_item);
                $this->fuel_search_view->append($node);
            }
        }
}

?>