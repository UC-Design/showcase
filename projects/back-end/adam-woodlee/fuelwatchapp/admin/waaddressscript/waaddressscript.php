<?php
/*This script is used to read a select number of .psv files(tables) attained from https://data.gov.au/dataset/ds-dga-e1a365fc-52f5-4798-8f0c-ed1d33d43b6d/details?q=gnaf and push the selected data to the database for the fuelwatchapp. This script will be manually run by admin. Maybe in the future it can be run as a crontab so that when new suburbs are added the system will automatically update.
*/

include "/var/www/html/fuelwatchapp.com/admin/config/paths.php";

$dbhost = $dbhost_config;
$username = $dbusername_config;
$password = $dbpassword_config;
$dbname = $dbname_config;
$conn;

$conn = new mysqli($dbhost, $username, $password, $dbname);
                if($conn->connect_error) {
                    echo "\n-->Connection failed: ".$conn->connect_error;
                    exit();
                }

//<------open file wa_locality------->
$wa_locality;
$num_pipes = 0;
if(!($wa_locality = fopen("WA_LOCALITY_psv.txt", "r"))){
    echo "error open file wa_locality.txt";
}
    $locality_pid = "";
    $locality_name = "";
while($data = fread($wa_locality, 4096)){
    $split = str_split($data);
    foreach($split as $char){
        if($num_pipes == 0 && $char != '|') {
            $locality_pid .= $char;
        }
        if($num_pipes == 3 && $char != '|') {
            $locality_name .= $char;
        }
        if($char == '|') {
            $num_pipes++;
        }
        if($char == "\n") {
            $locality_pid = justifyquerystring($locality_pid);
            $locality_name = justifyquerystring($locality_name);

            $sql_insert_locality = "INSERT INTO wa_locality (locality_pid, locality_name) VALUES ('$locality_pid', '$locality_name')";

            if(!($result = $conn->query($sql_insert_locality))) {
                echo "Error 1: SQL query - $conn->error \n" ;
            }
            else {
                echo "Success 1: SQL INSERT product - $sql_insert_locality \n";
            }
            $num_pipes = 0;
            $locality_pid = "";
            $locality_name = "";
        }
    }
}
fclose($wa_locality);
//<------open file wa_locality_point------->
$wa_locality_point;
if(!($wa_locality_point = fopen("WA_LOCALITY_POINT_psv.txt", "r"))){
    echo "error open file wa_locality.txt";
}
$num_pipes = 0;
$locality_point_pid = "";
$locality_pid = "";
$latitude = "";
$longitude = "";
while($data = fread($wa_locality_point, 4096)){
    $split = str_split($data);
    foreach($split as $char){
        if($num_pipes == 0 && $char != '|') {
            $locality_point_pid .= $char;
        }
        if($num_pipes == 3 && $char != '|') {
            $locality_pid .= $char;
        }
        if($num_pipes == 5 && $char != '|') {
            $longitude .= $char;
        }
        if($num_pipes == 6 && $char != '|') {
            $latitude .= $char;
        }
        if($char == '|') {
            $num_pipes++;
        }
        if($char == "\n") {
            $latitude = floatval($latitude);
            $longitude = floatval($longitude);
            $locality_point_pid = justifyquerystring($locality_point_pid);            
            $locality_pid = justifyquerystring($locality_pid);

            
            $sql_insert_locality_point = "INSERT INTO wa_locality_point (locality_point_pid, locality_pid, latitude, longitude) VALUES ('$locality_point_pid', '$locality_pid', $latitude, $longitude)";

            if(!($result = $conn->query($sql_insert_locality_point))) {
                echo "Error 2: SQL query - $conn->error - $sql_insert_locality_point\n" ;
            }
            else {
                echo "Success 2: SQL INSERT product - $sql_insert_locality_point \n";
            }
            $num_pipes = 0;
            $locality_point_pid = "";
            $locality_pid = "";
            $longitude = "";
            $latitude = "";
        }
    }
}
fclose($wa_locality_point);

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

?>