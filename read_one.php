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
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$product->id = $_GET['id'];
 
// read the details of product to be edited
$product->readOne();
 
// create array
$product_arr[] = array(
    "id" =>  $product->id,
    "name" => $product->name,
    "description" => $product->description,
    "price" => $product->price
);
 
// make it json format
print_r(json_encode($product_arr));
?>