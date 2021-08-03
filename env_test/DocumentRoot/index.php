<?php

// include database and object files
include_once './config/database.php';
include_once './objects/version.php';
 
// instantiate database and category object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$appVersion = new AppVersion($db);

if(isset($_GET['del']) ){
     $appVersion->id = (int) $_GET['del'];
     $appVersion->delete();
}

if(isset($_POST['formSubmit']) ){
	 $appVersion->_ean = $_POST['_ean'];
	 $appVersion->_image1_base64 = $_POST['_image1_base64'];

	//  if (isset($_POST['id'])){
	// 	$appVersion->id = $_POST['id'];
	// 	$appVersion->update();
	//  } else {
		$appVersion->create();
	//  }
}
  
$stmt = $appVersion->readAll();
$num = $stmt->rowCount();

?>
<!doctype html>
<html lang=en>
<head>
         <meta charset=utf-8>
         <meta name=viewport content="width=device-width,initial-scale=1">
         <title>Paczki</title>

         <link rel="stylesheet" href="vendor/bootstrap.min.css">
         <script src="vendor/jquery.min.js"></script>
         <script src="vendor/bootstrap.min.js"></script>
         <style>
           .tile {
            padding: 8px;
            float: left;
            overflow: hidden;
           }
        </style>

<head>
<body>


<nav class="navbar navbar-inverse">
   <div class="container-fluid">
     <div class="navbar-header">
       <button type="button" class="navbar-toggle"
data-toggle="collapse" data-target="#myNavbar">
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
       <a class="navbar-brand" href="/">Paczki</a>
     </div>
   </div>
</nav>

<div class="panel-body">
<a href="/edit.php" class="btn btn-primary btn-lg btn-block" role="button">Dodaj</a>

<div>
<?php
  if($num>0){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      extract($row);
      echo '<div class="tile">
      <img src="data:image/png;base64, '.$row['_image1_base64'].'" alt="Red dot" />
      <p>'.$row['_ean'].'</p>
      <a href="?del='.$row['id'].'" role="button">
        <img class="img-responsive center-block" style="width: 32px;" src="vendor/delete-icon.png" alt="zobacz">
      </a>
      </div>';
    }
  }
?>
</div>

</div>

<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog"
aria-labelledby="myModalLabel" aria-hidden="true">
     <div class="modal-dialog">
         <div class="modal-content">
             <div class="modal-header">
                 Usuwam
             </div>
             <div class="modal-body">
                 <p class="debug-url"></p>
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-default"
data-dismiss="modal">Anuluj</button>
                 <a class="btn btn-danger btn-ok">Usuń</a>
             </div>
         </div>
     </div>
</div>

<footer class="container-fluid text-center">
   <p>2021 Kamil Mucik</p>
</footer>

</body>
</html>

