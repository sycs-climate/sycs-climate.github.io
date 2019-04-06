<?php

  $http_origin = $_SERVER['HTTP_ORIGIN'];

  if ($http_origin == "http://www.sycs.org.uk" || $http_origin == "http://localhost") {
    header("Access-Control-Allow-Origin: $http_origin");
  }

  $token = $_POST['token'];
  $topic = $_POST['topic'];
  $server_key = '';
  $fh = fopen($topic . '.txt', 'a+');
  fwrite($fh, $token);
  fclose($fh);

  $url = 'https://iid.googleapis.com/iid/v1/' . $token . '/rel/topics/' . $topic;

  $requestHeaders = array(
    'Authorization: key=' . $server_key,
    'Content-type: application/json; UTF-8',
    'Content-Length: 0'
  );

  $options = array(
    'http' => array(
      'header'  => implode("\r\n", $requestHeaders),
      'method'  => 'POST',
      'content' => ''
    )
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  if ($result === FALSE) {
    echo 'ERROR';
  }
  else {
    echo '200 OK';
  }

 ?>
