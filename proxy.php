<?php

$app = '';
switch ($_GET['navigator']) {
    case 'Carsten':
        $app .= 'https://script.google.com/macros/s/AKfycbyD-AO9qTpvDhLdadZl_YU9Xec0n3YkOZwteAE3qWMNLIDcV6SU/exec';
        break;
    case 'Bob':
        $app .= 'https://script.google.com/macros/s/AKfycbwwc7wQt8u6-4cPwNWd12sGUIOPYxptEocEVFxPavt91AGDXKI/exec';
        break;
}

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
