<?php
$dbHost = '';
$dbName = '';
$dbUS = '';
$dbPW = '';
$dbConn = mysqli_connect($dbHost, $dbUS, $dbPW, $dbName);

$fun = $_GET['fun'];
if($fun == "getQ"){
  getQuote();
} else if($fun == "addQ"){
  addQuote();
} else if($fun == "remQ"){
  removeQuote();
} else {
  if (mysqli_connect_errno()) {
      echo "Connect failed: " . mysqli_connect_error();
      die();
  }
  if (mysqli_ping($dbConn)) {
      echo "Our connection is ok!";
  } else {
      echo "Error: " . mysqli_error($dbConn);
  }

}

function getQuote(){
  if(isset($_GET['id'])){
    $query = "SELECT * FROM quotes WHERE ID = " . $_GET['id'];
  } else {
    $query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";
  }

  global $dbConn;
  $result = mysqli_query($dbConn,$query);
  if($result->num_rows == 0){
    $result = mysqli_query($dbConn,"SELECT * FROM quotes ORDER BY RAND() LIMIT 1");
  }
  $row = $result->fetch_assoc();
  if($row["author"] == ""){
    $row["author"] = "Unknown";
  }
  $Amsg = ['id' =>$row["ID"],'quote' => $row["quote"], 'author' => $row["author"]];
  echo json_encode($Amsg);
}

function addQuote(){
  checkAuth();
  $q = addslashes($_GET['q']);
  $a = addslashes($_GET['a']);
  $query = "INSERT INTO quotes (quote,author) VALUES ('".$q."','".$a."')";

  global $dbConn;
  mysqli_query($dbConn,$query);

  $Amsg = ['msg' => "added", 'id' => mysqli_insert_id($dbConn)];
  echo json_encode($Amsg);
}

function removeQuote(){
  checkAuth();
  $query = "DELETE FROM quotes WHERE ID = " . $_GET['id'];

  global $dbConn;
  mysqli_query($dbConn,$query);

  $Amsg = ['msg' => "removed"];
  echo json_encode($Amsg);
}

function checkAuth(){
  if($_GET['auth'] != ""){
    $Amsg = ['msg' => "no rights"];
    echo json_encode($Amsg);
    die();
  }
}

?>
