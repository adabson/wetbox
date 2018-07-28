<?php
  /*
    @todo: limit the permissions on this file so it cant be accessed publicly (htaccess should be fine)
    to add this to the corontab, open a console and edit the crontab
    crontab -e 
    * * * * * php /volume1/Web/wetbox/minutly.php
    :x
    (* * * * * will run this script every minute)
  */

  $isUp = @fsockopen("www.google.com", 80) ? 1 : 0;
  $conn = new mysqli( 'localhost', 'username', 'password', 'base' );
  if( $conn->connect_error ) { die(); }

  $sql = 'insert into uptime (isup) values ('.$isUp.');';
  $results = $conn->query($sql);
  $conn->close();
?>