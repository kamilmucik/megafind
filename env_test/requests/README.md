curl -X POST -H "Content-Type: application/json" -d '{"_ean": "_ean","_image1_base64": "_image1_base64"}' http://localhost/api/create.php


curl -X POST -H "Content-Type: application/json" -d "@create.json" http://localhost/api/create.php


curl -X POST -H "Content-Type: application/json" -d "@create.json" http://e-strix.pl/megapack/megafind/api/create.php