<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/version.php';
 
// instantiate database and category object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$appVersion = new AppVersion($db);
   
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
$appVersion->_ean = $data->_ean;
$appVersion->_image1_base64 = $data->_image1_base64;
 
if($appVersion->create()){
    echo '{';
        echo '"message": "Item was created."';
    echo '}';
}else{
    echo '{';
        echo '"message": "Unable to create item."';
    echo '}';
}
?>