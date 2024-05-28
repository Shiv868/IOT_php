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

// Assuming your table is named 'sensor_data' and has columns 'temperature' and 'humidity'
$temperature = $_POST['temperature'];
$humidity = $_POST['humidity'];

// Validate incoming data (you may want to add more validation based on your requirements)
if (!is_numeric($temperature) || !is_numeric($humidity)) {
    echo "Invalid data format";
    exit;
}

$sql = "INSERT INTO sensor_data (temperature, humidity) VALUES ('$temperature', '$humidity')";

if ($conn->query($sql) === TRUE) {
    echo "Data recorded successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
