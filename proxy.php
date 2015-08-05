<?php

include 'users.php';

$nav = $_GET['navigator'];
$app = $users[$nav];

$host = $app . '?' . http_build_query($_GET);

file_put_contents('proxy.log', $host, FILE_APPEND);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $host,
    CURLOPT_FOLLOWLOCATION => true
));

$res = curl_exec($curl);
file_put_contents('proxy.log', $res + "\n", FILE_APPEND);

return json_encode($res);
