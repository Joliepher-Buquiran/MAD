<?php
// Database connection settings
$servername = "localhost"; // Usually 'localhost' or the IP of your database server
$username = "root";        // Your database username (e.g., 'root' or another user)
$password = "";            // Your database password (leave empty if there is no password)
$dbname = "your_database_name"; // The name of your database

// Create a connection to the MySQL database using mysqli
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If the connection is successful, the script will continue execution
// You can now use $conn to run queries
?>
