<?php 
$conn = new mysqli( 'localhost', 'username', 'password', 'base' );
if ( $conn->connect_error ) {
  die();
}
$sql = 'select * from (select * from uptime order by date desc limit 1441) as lastDay order by lastDay.date asc';
$results = $conn->query($sql);
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
<title>wetbox</title>
<style>
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size:14px;
}
h1{
  margin: 0 0 10px 0;
}
.box {
  width: 10px;
  height: 10px;
  margin: 1px;
  color:#fff;
  background-color:#000;
}
.g {
  background-color: #4f4;
}
.r {
  background-color: #f44;
}
.w {
  background-color: #fff;
}
.col {
  width:25px;
  height:660px;
  display:block;
  float:left;
}
.nicetime {
  margin-bottom:7px;
  display:block;
  transform:rotate(-45deg);
}
</style>
<link rel="shortcut icon" href=".config/img/favicon.ico" type="image/x-icon"/>
</head>
<body>

<div style="margin-bottom:50px;">
  <h1 style="float:left;margin-right:10px">Server Status (24hr)</h1>
  <div class="box" style="float:left;"></div> = blackout<br>
  <div class="box g" style="float:left;"></div> = online<br>
  <div class="box r" style="float:left;"></div> = offline
</div>
<br>

<div class="col">
<?
$nowTick = (time()/60) % 1440;
$shift = 1399 - $nowTick;
$firstrow = $results->fetch_assoc()["date"];
$firstTick = (strtotime( $firstrow )/60 + $shift) % 1440;

for($expected=0;$row=$results->fetch_assoc();$expected++) {
  $tock = (strtotime( $row["date"] )/60 + $shift) % 1440; //rounded to the nearest minute //1440 mins in a day
  $onoff = $row["isup"] == 1 ? 'g' : 'r';

  for(;$expected<$tock-1;$expected++) {
    newCol($expected);
    echo '<div class="box"></div>';
  }

  echo "<div class='box $onoff'></div>";
  newCol($tock);
}

function newCol( $x ) {
  $cond = $x % 60 == 0;
  if ( $cond ) {
    echo '</div><div class="col"><span class="nicetime">'.($x/60).'</span>';
  }
}
?>
</div>

<br/>
</body>
</html>