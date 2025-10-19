<?php
// Simple API boot for tedious-tagger
// Routes are extremely minimal; this file delegates to functions in /api/lib

require_once __DIR__ . '/lib/storage.php';
require_once __DIR__ . '/lib/thumbs.php';

$action = $_GET['action'] ?? '';

header('Content-Type: application/json');

switch ($action) {
    case 'list':
        echo json_encode(list_photos());
        break;
    default:
        echo json_encode(['error' => 'unknown action']);
}
