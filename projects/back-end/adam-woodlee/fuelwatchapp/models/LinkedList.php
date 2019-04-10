<?php 
namespace app\models;
use Yii;
use yii\base\Model;

class LinkedList {
    private $root;
    private $cur;
    
    function __construct() {
        $this->root = null;
    }
    function getroot() {
        return $this->root;
    }
    
    function append($node) {
        if($this->root == null) {
            $this->root = $node;
        }
        else {
            $this->cur = $this->root;
            while(1) {
                if($this->cur->getnextnode() == null) {
                    $this->cur->setnextnode($node);
                    break;
                }
                else {
                    $this->cur = $this->cur->getnextnode();
                }
            }
        }
    }
}
?> 
