<?php
// storage helpers for tedious-tagger

function data_file_path() {
    return __DIR__ . '/../../data/photos.json';
}

function list_photos() {
    $path = data_file_path();
    if (!file_exists($path)) {
        return [];
    }
    $json = file_get_contents($path);
    return json_decode($json, true) ?: [];
}

function save_photos($arr) {
    $path = data_file_path();
    file_put_contents($path, json_encode($arr, JSON_PRETTY_PRINT));
}
