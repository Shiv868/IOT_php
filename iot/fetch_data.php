<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "iot";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the latest sensor data from the database, ordered by the order of insertion
$sql = "SELECT temperature, humidity FROM sensor_data ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = array('temperature' => $row['temperature'], 'humidity' => $row['humidity']);
    echo json_encode($data);
} else {
    echo json_encode(array('temperature' => 'N/A', 'humidity' => 'N/A'));
}

$conn->close();
?>
