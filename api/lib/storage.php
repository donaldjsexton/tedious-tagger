<?php
define('DATA_DIR', __DIR__ . '/../../data');
define('DATA_FILE', DATA_DIR . '/photos.json');
define('DATA_UPLOADS', DATA_DIR . '/uploads');
define('DATA_THUMBS', DATA_DIR . '/thumbs');

function ensure_dirs(): void {
    foreach ([DATA_DIR, DATA_UPLOADS, DATA_THUMBS] as $d) {
        if (!is_dir($d)) mkdir($d, 0775, true);
    }
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, json_encode(['tags'=>[], 'photos'=>[]], JSON_PRETTY_PRINT));
    }
}
function load_photos(): array {
    return json_decode(file_get_contents(DATA_FILE), true) ?? ['tags'=>[], 'photos'=>[]];
}
function save_photos(array $data): void {
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}
