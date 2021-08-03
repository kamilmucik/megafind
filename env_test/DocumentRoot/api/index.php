<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/version.php';
 
// instantiate database and category object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$appVersion = new AppVersion($db);
  
$stmt = $appVersion->readAll();
$num = $stmt->rowCount();
if($num>0){
    $version_arr=array();
    $version_arr["results"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $version_item=array(
            "id" => $id,
            "_ean" => $_ean,
            "_image1_base64" => $_image1_base64
        );
        array_push($version_arr["results"], $version_item);
    }
    echo json_encode($version_arr);
}else{
    echo json_encode(
        array("message" => "No item found.")
    );
}
?>