<?php 
/*
This program is used to read an RSS feed (https://www.fuelwatch.wa.gov.au) and store the data in a database for the fuelwatchapp. The RSS is in XML and the program leverages the php functions:
1. xml_parse() 
2. xml_set_element_handler()
3. xml_set_character_data_handler()

xml_set_element_handler() sets what functions should be called when xml_parse() encounters "start" and "end tags. Similarly xml_set_character_data_handler() sets what function should be called when the parser encounters character data.

The class RssUtil is defined to leverage code resuse. An object is instantiated for a Rss feed that represents all the different prices and associated details for one type of fuel. The object is destructed after the details have been read, verified and pushed to the database. This process continues for all other available fuel types.

RssUtil's constructor sets up the connects with the database and sets up streams to log files. The constructor then calls the parse_XML which in turn calls other local functions as needed.

Note this script will be run daily as a cron tab to accumulate data.
*/
include "/var/www/html/fuelwatchapp.com/admin/config/config.php";

$product = new RssUtil("ulp", $ulp_expat, $ulp_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "1", "Unleaded");
$product = null;

$product = new RssUtil("ulpp", $ulpp_expat, $ulpp_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "2", "Premium Unleaded");
$product = null;

$product = new RssUtil("diesel", $diesel_expat, $diesel_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "4", "Diesel");
$product = null;

$product = new RssUtil("lpg", $lpg_expat, $lpg_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "5", "LPG");
$product = null;

$product = new RssUtil("ron98", $ron98_expat, $ron98_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "6", "98 RON");
$product = null;

$product = new RssUtil("e85", $e85_expat, $e85_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "10", "e85");
$product = null;

$product = new RssUtil("dieselbrand", $diesel_brand_expat, $diesel_brand_sql, $dbhost_config, $dbusername_config, $dbpassword_config, $dbname_config, "11", "Brand Diesel");
$product = null;

class RssUtil {
//<----------------------------Config-------------------------------->
            private $fuel_type_database_table;
            private $dbhost;
            private $username;
            private $password;
            private $dbname;
            private $conn;
            private $parser;

//<----------------------------Product details------------------------>
            private $title;
            private $brand;
            private $date_;
            private $price;
            private $trading_name;
            private $location;
            private $phone;
            private $latitude;
            private $longitude;
            private $product_id;
            private $product_name;
            private $address;
    
//<----------------------------Logic---------------------------------->
            private $item = false;
            private $current_element;
    
//<----------------------------File pointers-------------------------->
            private $rss;
            private $expat_log;
            private $sql_log;


//<-------------Destruct parser, close file streams, close DB connection-------------------------->
            function __destruct (){
                fclose($this->rss);
                xml_parser_free($this->parser);
                fclose($this->sql_log);
                fclose($this->expat_log);
                $this->conn->close();
            }


            function __construct($fuel_type_database_table, $expat_log, $sql_log, $dbhost, $username, $password, $dbname, $product_id, $product_name) {
                $this->fuel_type_database_table = $fuel_type_database_table;
                $this->dbhost = $dbhost;
                $this->username = $username;
                $this->password = $password;
                $this->dbname = $dbname;
                $this->product_id = $product_id;
                $this->product_name = $product_name;

                $this->sql_log = fopen($sql_log, "a");
                try {
                    //<--------------------------------Setup database connection------------------------->
                    if(($this->conn = new mysqli($this->dbhost, $this->username, $this->password, $this->dbname)) == null) {
                        throw new Exception("Couldn't Create DB Object");
                    }
                    if($this->conn->connect_error) {
                        $date = date_create();
                        if($this->sql_log) {
                            fwrite($this->sql_log, "\n-->Connection failed:  ".$this->conn->connect_error .date_timestamp_get($date));
                        }
                        throw new Exception("Couldn't Connect to DB"); 
                    }                    
                }
                catch (Exception $e) {
                    exit();
                }
//<--------------------------------Delete Historical Data------------------------->
                $this->deletehistoricaldata();
//<--------------------------------------logging files---------------------------------->
                $this->rss = fopen("https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=".$this->product_id ,"r");
                $this->expat_log = fopen($expat_log, "a");
//<--------------------------------------Parse the XML---------------------------------->
                $this->parse_XML();

            }
            private function deletehistoricaldata() {
                $date = date('Y-m-d', time() - (2 * 24 * 60 * 60));
                $sql_delete_historical = "DELETE FROM ".$this->fuel_type_database_table." WHERE date < '".$date."'";
                $date = date('m/d/Y h:i:s a', time());
                if($this->conn->query($sql_delete_historical)) {
                    if($this->sql_log) {
                       fwrite($this->sql_log, "Success: SQL Query - " .$sql_delete_historical.":".$date."\n"); 
                    }
                }
                else {
                    if($this->sql_log) {
                        fwrite($this->sql_log, "Error: SQL query -  ".$this->conn->error. ":".$date."\n");
                    }
                }
            }
    
            private function parse_XML () {
//<--------------------------------------Create and set setup parser---------------------------------->
                $this->parser = xml_parser_create(); 
                xml_set_object($this->parser, $this); 
                xml_set_element_handler($this->parser, "start", "stop");
                xml_set_character_data_handler($this->parser, "char");
//<--------------------------------------Read XML, Events are called as needed---------------------------------->
                while ($data=fread($this->rss,4096)) {
                if(!(xml_parse($this->parser,$data,feof($this->rss)))) {
                    $xml_error = xml_error_string(xml_get_error_code($this->parser));
                    $xml_line_num = xml_get_current_line_number($this->parser);
                    fwrite($this->expat_log, "\nXML Error: $xml_error at line number $xml_line_num"); 
                    }     
                } 
            }
            private function start($parser,$element_name,$element_attrs) {
            $this->current_element = $element_name;
                    if ($element_name == "ITEM") {
                        $this->item = true;
                    }
            }
            private function stop($parser, $element_name) {
                if($element_name == "ITEM") {
                    $this->cleantitle();
                    $this->updatestation();
                    $this->insertitem();
                }
            }
            private function char($parser, $data) {
                if($this->item) {
                    switch($this->current_element) {
                        case "TITLE": 
                            $this->title .= $data;
                            break;
                        case "BRAND":
                            $this->brand .= $data;
                            break;
                        case "DATE": 
                            $this->date_ .= $data;
                            break;
                        case "PRICE":
                            $this->price .= $data;
                            break;
                        case "TRADING-NAME":
                            $this->trading_name .= $data;
                            break;
                        case "LOCATION": 
                            $this->location .= $data;
                            break;
                        case "PHONE":
                            $this->phone .= $data;
                            break;
                        case "LATITUDE": 
                            $this->latitude .= $data;
                            break;
                        case "LONGITUDE":
                            $this->longitude .= $data;
                            break;
                        case "ADDRESS":
                            $this->address .= $data;
                            break;
                        }
                }
            }
//<--------------------------------------Remove redundent data from title---------------------------------->
            private function cleantitle () {
                $title = str_split($this->title);
                $trimmed_title = "";
                $trim_price_flag = false;
                $trim_leading_whitespace_flag = false;
                foreach($title as $char) {
                    if($trim_price_flag) {
                        if($trim_leading_whitespace_flag) {
                            $trimmed_title .= $char;
                        }
                        else {
                            $trim_leading_whitespace_flag = true;
                        }

                    }
                    if($char == ':' && !$trim_leading_whitespace_flag)
                    {
                        $trim_price_flag = true;
                    }
                }
                $this->title = $trimmed_title;
            }
//<--------------------------------------Add unknown Stations to database---------------------------------->
            private function updatestation () {
                $this->title = $this->justifyquerystring($this->title); 
                $this->trading_name = $this->justifyquerystring($this->trading_name);
                $this->address = $this->justifyquerystring($this->address);
                $this->location = $this->justifyquerystring($this->location);

                $sql_verify_station = "SELECT title FROM Stations WHERE title = '".$this->title."'";

                if(!($result = $this->conn->query($sql_verify_station))) {
                    if($this->sql_log) {
                        fwrite($this->sql_log, "\nError 1: SQL query - " .$this->conn->error);
                    }
                }
                else {
                        if($this->sql_log) {
                            fwrite($this->sql_log, "\nSuccess 1: SQL query - " .$sql_verify_station);
                        }
                        if($result->num_rows == 0) {
                        $this->latitude = floatval($this->latitude);
                        $this->longitude = floatval($this->longitude);

                        $sql_insert_station = "INSERT INTO Stations (title, trading_name, location, phone, latitude, longitude, address) VALUES ('$this->title', '$this->trading_name', '$this->location', '$this->phone', $this->latitude, $this->longitude, '$this->address')";
                            
                        $sql_insert_station = "INSERT INTO Stations (title, trading_name, location, phone, latitude, longitude, address) VALUES ('".$this->title."', '".$this->trading_name."', '".$this->location."', '".$this->phone."', ".$this->latitude.", ".$this->longitude.", '".$this->address."')";

                        if($this->conn->query($sql_insert_station) === TRUE) {
                            if($this->sql_log) {
                                fwrite($this->sql_log, "\nSuccess 2: SQL INSERT Station - $this->title");
                            }
                        }
                        else {
                            if($this->sql_log) {
                                fwrite($this->sql_log, "\nError 2: SQL query -  " .$this->conn->error);
                            }
                        }
                    }
                }
        }
//<--------------------------------------Escape characters for sql queries---------------------------------->
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
    
//<--------------------------------------Insert Item into database---------------------------------->
        private function insertitem() {
            $this->price = floatval($this->price);
            
            $sql_insert_product = "INSERT INTO " .$this->fuel_type_database_table. " (title, product, brand, date, price) VALUES ('".$this->title."', '".$this->product_name."', '".$this->brand."', '".$this->date_."', ".$this->price.")";

            if(!($result = $this->conn->query($sql_insert_product))) {
                if($this->sql_log){
                    fwrite($this->sql_log, "\nError 3: SQL query - " .$this->conn->error);
                }   
            }
            else {
                if($this->sql_log) {
                   fwrite($this->sql_log, "\nSuccess 3: SQL INSERT product - $this->title:$this->date_:$this->price:$this->product_name"); 
                }
            }
//<-----------------Reset $item_details ready for next item----------------->
            $this->title = "";
            $this->brand = "";
            $this->date_ = "";
            $this->price = "";
            $this->trading_name = "";
            $this->location = "";
            $this->phone = "";
            $this->latitude = "";
            $this->longitude = "";
            $this->address = "";
        }
    }
?>