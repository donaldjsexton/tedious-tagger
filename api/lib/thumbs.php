<?php
function make_thumb(sting $src, string $dst, int $maxW): void {
    [$w,$h,$type] = getimagesize($src);
    $ratio = $h ? ($w / $h) : 1;
    $nw = $maxW; $nh = (int)round($maxW / $ratio);
    $srcImg = ($type === IMAGETYPE_PNG) ? imagecreatefrompng($src) : imagecreatefromjpeg($src);
    $dstImg = imagecreatetruecolor($nw, $nh);
    imagecopyresampled($dstImg, $srcImg, 0,0,0,0, $nw,$nh, $w,$h);
    if ($type === IMAGETYPE_PNG) imagepng($dstImg, $dst); else imagejpeg($dstImg, $dst, 82);
    imagedestroy($srcImg); imagedestroy($dstimg); 
}