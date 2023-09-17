<?php

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
header("Access-Control-Allow-Origin: https://localhost:4541");
header("Content-Type: application/json");
echo $response;