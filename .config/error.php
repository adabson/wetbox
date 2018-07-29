<!DOCTYPE html>
<html>
<head>
<title>wetbox</title>
<style>
html {
  margin: 0;
  padding: 20px 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-size:14px;
  color:#f0a;
  background-color:#222;
}
h1{
  margin: 0 0 20px 0;
  font-size:5em;
  text-shadow: 1px 1px 1px #f0a, -1px -1px 1px #000;
}
</style>
</head>
<body>
<?php
  $status = $_SERVER['REDIRECT_STATUS'];
  $codes = array(
     403 => array('403 Forbidden', 'The server has refused to fulfill your request.'),
     404 => array('404 Not Found', 'The document/file requested was not found on this server.'),
     405 => array('405 Method Not Allowed', 'The method specified in the Request-Line is not allowed for the specified resource.'),
     408 => array('408 Request Timeout', 'Your browser failed to send a request in the time allowed by the server.'),
     500 => array('500 Internal Server Error', 'The request was unsuccessful due to an unexpected condition encountered by the server.'),
     502 => array('502 Bad Gateway', 'The server received an invalid response from the upstream server while trying to fulfill the request.'),
     504 => array('504 Gateway Timeout', 'The upstream server failed to send a request in the time allowed by the server.'),
  );

  $title = $codes[$status][0];
  $message = $codes[$status][1];
  if ($title == false || strlen($status) != 3) {
         $message = 'Please supply a valid status code.';
  }
  echo '<h1>'.$title.'</h1>
  <p>'.$message.'</p>';
?>
</body>
</html>