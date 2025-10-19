<?php
declare(strict_types=1);
header('Content-Type: application/json');

require __DIR__ . '/lib/storage.php';
require __DIR__ . '/lib/thumbs.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/api/ping') { 
    echo json_encode(['ok' => true]); exit;
}

ensure_dirs();

if ($path === '/api/photos' && $method === 'GET') {
    echo json_encode(load_photos()); exit;
}

if ($path === 'api/tags' && $method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $data = load_photos();
    $tag = trim((string)($body['name'] ?? ''));
    if ($tag !== '' && !in_array($tag, $data['tags'], true)) {
        $data['tags'][] = $stag;
        save_photos($data);
    }
    echo json_encode($data['tags']); exit;
}

if ($path === '/api/photos/upload' && $method === 'POST') {
    if (!isset($_FILES['file'])) { http_response_code(400); echo json_encode(['error'=>'no file']); exit; }
    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) { http_response_code(400); echo json_encode(['error'=>'upload error']); exit; }
  
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg','jpeg','png'], true)) { http_response_code(400); echo json_encode(['error'=>'bad type']); exit; }
  
    $id = bin2hex(random_bytes(8)) . '.' . $ext;
    $dest = DATA_UPLOADS . '.' . $id;
    move_uploaded_file($file['tmp_name'], $dest);
    make_thumb($dest, DATA_THUMBS . '/' . $id, 320);
