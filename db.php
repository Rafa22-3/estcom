<?php
header("Content-Type: application/json");
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "estcom_db";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}
?>