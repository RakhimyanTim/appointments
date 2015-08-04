<?php

$host = 'https://script.google.com/macros/s/AKfycbyD-AO9qTpvDhLdadZl_YU9Xec0n3YkOZwteAE3qWMNLIDcV6SU/exec'
        . '?' . http_build_query($_GET);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $host,
    CURLOPT_FOLLOWLOCATION => true
));

$res = curl_exec($curl);

return json_encode($res);
