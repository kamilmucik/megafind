<?php

// include database and object files
include_once './config/database.php';
include_once './objects/version.php';
 
// instantiate database and category object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$appVersion = new AppVersion($db);

$item_id = (int) $_GET['id'];
  
$appVersion->id=$item_id;
$appVersion->readOne();
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
<a href="/index.php" class="btn btn-info btn-lg btn-block"
role="button">Powrót</a>

  <form action="/index.php?" method="post">
  
     <input type="hidden" name="id" class="form-control" id="id" value="<?php echo $appVersion->id ?>">
   <div class="form-group">
     <label for="_ean">ean:</label>
     <input type="name" name="_ean" class="form-control" id="_ean" value="<?php echo $appVersion->_ean ?>">
   </div>
   <div class="form-group">
     <label for="_image1_base64">Opis:</label>
     <input type="name" name="_image1_base64" class="form-control" id="_image1_base64" value="<?php echo $appVersion->_image1_base64 ?>">
   </div>
   <button type="submit" name="formSubmit" class="btn btn-primary btn-lg btn-block">Zapisz</button>
</form>

</table>
</div>

<footer class="container-fluid text-center">
   <p>2020 Kamil Mucik</p>
</footer>

</body>
</html>

