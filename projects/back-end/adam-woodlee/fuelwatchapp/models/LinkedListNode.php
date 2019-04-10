<?php 
namespace app\models;
use Yii;
use yii\base\Model;

class LinkedListNode {
    private $data = null;
    private $next_node = null;
    
    function __construct($data) {
        $this->data = $data;
    }
    function getnextnode() {
        return $this->next_node;
    }
    function setnextnode($node) {
        $this->next_node = $node;
    }
    function getdata() {
        return $this->data;
    }
}
?> 
