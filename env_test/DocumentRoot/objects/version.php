<?php
class AppVersion{
 
    // database connection and table name
    private $conn;
    private $table_name = "app_version";
 
    // object properties
    public $id;
    public $_ean;
    public $_image1_base64;
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    // used by select drop-down list
    public function readAll(){
        //select all data
        $query = "SELECT
                    id, _ean, _image1_base64
                FROM
                    " . $this->table_name . "
                ORDER BY
                    id DESC";
 
		try {
			$stmt = $this->conn->prepare( $query );
			$stmt->execute();

			return $stmt;
		}catch(PDOException $exception){
			echo "Connection error: " . $exception->getMessage();
			die();
		}
    }
	
	// create product
	function create(){
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
				_ean=:_ean, _image1_base64=:_image1_base64";
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->_image1_base64=htmlspecialchars(strip_tags($this->_image1_base64));
		$this->_ean=htmlspecialchars(strip_tags($this->_ean));
		// bind values
		$stmt->bindParam(":_ean", $this->_ean);
		$stmt->bindParam(":_image1_base64", $this->_image1_base64);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}
	
	// used when filling up the update product form
	function readOne(){
	 
		// query to read single record
		$query = "SELECT
					p.id, p._image1_base64, p._ean
				FROM
					" . $this->table_name . " p
				WHERE
					p.id = ?
				LIMIT
					0,1";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of product to be updated
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		$this->_description = $row['_image1_base64'];
		$this->_ean = $row['_ean'];
	}
	
	// update the product
	function update(){	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
				_image1_base64 = :_image1_base64,
				_ean = :_ean
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->_image1_base64=htmlspecialchars(strip_tags($this->_image1_base64));
		$this->_ean=htmlspecialchars(strip_tags($this->_ean));
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		$stmt->bindParam(':_image1_base64', $this->_image1_base64);
		$stmt->bindParam(':_ean', $this->_ean);
		$stmt->bindParam(':id', $this->id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}
	
	// delete the product
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
		
	// read products with pagination
	public function readPaging($from_record_num, $records_per_page, $categoryId ){
	 
		// select query
		$query = "SELECT
					id, category_id, number, question
				FROM
					" . $this->table_name . " 
				WHERE 
					category_id = " . $categoryId . " 
				ORDER BY number DESC
				LIMIT ?, ?";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind variable values
		$stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
		$stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
	 
		// execute query
		$stmt->execute();
	 
		// return values from database
		return $stmt;
	}
	
	// used for paging products
	public function count($categoryId = 10){
		$query = "SELECT 
					COUNT(*) as total_rows 
				FROM 
					" . $this->table_name . "
				WHERE 
					category_id = " . $categoryId . " ";
	 
		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		return $row['total_rows'];
	}
}
?>