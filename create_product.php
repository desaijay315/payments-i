<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json ; charset = UTF-8");
define("APP_PATH", $_SERVER['DOCUMENT_ROOT']);
// include database and object files 
include_once ('../payments-jd/config/database.php'); 
include_once ('../payments-jd/objects/product.php');
// get database connection 
//include_once 'config/database.php'; 
$database = new Database(); 
$db = $database->getConnection();

// instantiate product object
//include_once 'objects/product.php';
$product = new Product($db);

// get posted data
$data = json_decode(file_get_contents("php://input")); 
 

// set product property values
$product->name = $data->name;
$product->price = $data->price;
$product->description = $data->description;
$product->category_id = $data->category_id;
$product->created = date('Y-m-d H:i:s');
 
// create the product
if($product->create()){
   echo '{';
        echo '"message": "Product was created."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create product."';
    echo '}';
}
?>