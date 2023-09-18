<?php

$allowedOrigins = [
    'https://localhost:4541',
    'https://tiptoi-manager.nico.dev',
];

function getToken()
{
    $curl = curl_init();

    $basicUser = 'tiptoi-manager-v2';
    $basicPassword = 'CYmWkYyhY3traWuGd5cHcNV';

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://oauth.ravensburger.com/oauth/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . base64_encode("{$basicUser}:{$basicPassword}")
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);

    return json_decode($response, true)['access_token'];
}

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://ttapiv2.ravensburger.com/api/v2/catalog/' . (array_key_exists('language', $_GET) ? $_GET['language'] : 'de_DE'),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . getToken(),
    ),
));

$response = curl_exec($curl);

curl_close($curl);

$origin = $_SERVER['HTTP_ORIGIN'];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, content-type");
header("Content-Type: application/json");
echo $response;
