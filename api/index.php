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

    $data = load_photos();
    $data['photos'][] = ['id'=>$id, 'name'=>$file['name'], 'tags'=>[], 'starred'=>false,];
    save_photos($data);
    echo json_encode(['id'=>$id]);
}

if ($path === '/api/photo/update' && $method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $data = load_photos();
    $byId = [];
    foreach ($data['photos'] as $p) $byId[$p['id']] = $p;
    foreach (($body['updates'] ?? []) as $u) {
        $id = $u['id'] ?? '';
        if (isset($byId[$id])) {
            if (isset($u['tags'])) $byId[$id]['tags'] = array_values(array_unique(array_map('strval',$u['tags'])));
            if (isset($u['starred'])) $byId[$id]['starred'] = (bool)$u['starred'];
            if (isset($u['name'])) $byId[$id]['name'] = (string)$u['name'];
        }
        }
        $data['photos'] = array_values($byId);
        save_photos($data);
        echo json_encode(['ok'=>true]);exit;
}

if ($path === 'api/export/csv' && $method === 'GET') {
    $data = load_photos();
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="export.csv"');
    $out = fopen('php://output', 'w');
    fputcsv ($out, ['filename','tags','starred']);
    foreach ($data['photos'] as $p) {
        fputcsv($out, [$p['name'], implode('|',$p['tags']), $p['starred'] ? '1':'0']);
    }
    fclose($out);
    exit;
}

http_response_code(404);
echo json_encode(['error'=>'not found']);