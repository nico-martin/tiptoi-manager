<?php
// URL of the .gme file you want to fetch
$url = $_GET['url'];
$valid_url_regex = '/^https:\/\/cdn\.ravensburger\.de\//m';
$allowedOrigins = [
    'https://localhost:4541',
    'https://tiptoi-manager.nico.dev',
];

if (!$url) {
    $contents = 'ERROR: url not specified';
    $status = array('http_code' => 'ERROR');
    exit;
} elseif (!preg_match($valid_url_regex, $url)) {
    $contents = 'ERROR: invalid url';
    $status = array('http_code' => 'ERROR');
    exit;
}

// Define the filename for the downloaded file
$fileName = basename($url);

// Fetch the .gme file from the remote server
$fileContents = file_get_contents($url);

if ($fileContents === false) {
    // Failed to fetch the file, handle the error
    die('Failed to fetch the .gme file.');
}
$origin = $_SERVER['HTTP_ORIGIN'];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Set the appropriate HTTP headers to indicate a file download
header('Content-Type: application/octet-stream');
//header('Content-Disposition: attachment; filename="' . $fileName . '"');

// Output the file contents
echo $fileContents;
