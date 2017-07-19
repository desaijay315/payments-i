<?php

/**
* 
*/
class Database
{
	 // specify your own database credentials 
    private $host = "localhost"; 
    private $db_name = "angular-php"; 
    private $username = "root"; 
    private $password = "krd123"; 
    public $conn; 

    public function getConnection(){
    	$this->conn = null;
    	try{
    		$this->conn = new PDO("mysql:host=".$this->host . ";dbname=".$this->db_name, $this->username, $this->password);
    	}catch(PDOException $exception){
    		echo "Error : ".$exception->getMessage();
    	}
    	return $this->conn;
    }
}