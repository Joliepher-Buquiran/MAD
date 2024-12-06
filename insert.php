<?php
include 'db.php'; 

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$address = $data['address'];
$email = $data['email'];


$query = "INSERT INTO users (name, address, email) VALUES ('$name', '$address', '$email')";
$result = mysqli_query($conn, $query);

if ($result) {
    
    $id = mysqli_insert_id($conn);

    
    echo json_encode([
        'success' => true,
        'id' => $id,
        'name' => $name,
        'email' => $email
    ]);
} else {
    
    echo json_encode(['success' => false, 'error' => 'Failed to insert data']);
}

mysqli_close($conn);
?>
