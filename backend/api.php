<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$username = "root";
$password = "";
$database = "social_media_dashboard";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM posts ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $posts = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $posts[] = $row;
            }
        }

        echo json_encode($posts);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $author = $conn->real_escape_string($data['author']);
        $content = $conn->real_escape_string($data['content']);

        $sql = "INSERT INTO posts (author, content) VALUES ('$author', '$content')";

        if ($conn->query($sql) === TRUE) {
            $post_id = $conn->insert_id;
            $response = [
                "status" => "success",
                "message" => "Post created successfully",
                "id" => $post_id
            ];
            echo json_encode($response);
        } else {
            $response = [
                "status" => "error",
                "message" => "Error: " . $sql . "<br>" . $conn->error
            ];
            echo json_encode($response);
        }
        break;
}

$conn->close();