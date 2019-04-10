<?php 
namespace app\models;
use Yii;
use yii\base\Model;

class SearchItem {
    private $title;
    private $trading_name;
    private $location;
    private $phone;
    private $latitude;
    private $longitude;
    private $address;
    private $product;
    private $date_;
    private $price;

    function gettitle() {
        return $this->title;
    }
    function gettradingname() {
        return $this->trading_name;
    }
    function getlocation() {
        return $this->location;
    }
    function getphone() {
        return $this->phone;
    }
    function getlatitude() {
        return $this->latitude;
    }
     function getlongitude() {
        return $this->longitude;
    }
    function getaddress() {
        return $this->address;
    }
    function getproduct() {
        return $this->product;
    }
    function getdate_() {
        return $this->date_;
    }
    function getprice() {
        return $this->price;
    }
    function puttitle($title) {
        $this->title = $title;
    }
    function puttradingname($trading_name) {
        $this->trading_name = $trading_name;
    }
    function putlocation($location) {
        $this->location = $location;
    }
    function putphone($phone) {
        $this->phone = $phone;
    }
    function putlatitude($latitude) {
        $this->latitude = $latitude;
    }
     function putlongitude($longitude) {
        $this->longitude = $longitude;
    }
    function putaddress($address) {
        $this->address = $address;
    }
    function putproduct($product) {
        $this->product = $product;
    }
    function putdate_($price) {
        $this->date_ = $price;
    }
    function putprice($price) {
        $this->price = $price;
    } 
}
?> 
