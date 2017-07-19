<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json ; charset = UTF-8");
define("APP_PATH", $_SERVER['DOCUMENT_ROOT']);
// include database and object files 
include_once ('../payments-jd/config/database.php'); 
include_once ('../payments-jd/objects/product.php'); 
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// get product id
$data = json_decode(file_get_contents("php://input"));     
 
// set product id to be deleted
$product->id = $data->id;
 
// delete the product
if($product->delete()){
     echo '{';
        echo '"message": "Product was deleted."';
    echo '}';
}
 
// if unable to delete the product
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>