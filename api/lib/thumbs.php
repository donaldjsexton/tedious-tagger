<?php
// placeholder for thumbnail handling

function ensure_thumb($filename) {
    $thumbDir = __DIR__ . '/../../data/thumbs';
    if (!is_dir($thumbDir)) mkdir($thumbDir, 0755, true);
    $thumbPath = $thumbDir . '/' . basename($filename);
    if (!file_exists($thumbPath)) {
        // naive copy for placeholder; in real setup generate a resized image
        copy(__DIR__ . '/../../data/uploads/' . basename($filename), $thumbPath);
    }
    return $thumbPath;
}
