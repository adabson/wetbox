<?php 
$conn = new mysqli( 'localhost', 'username', 'password', 'base' );
if ( $conn->connect_error ) {
  die();
}
$sql = 'select * from (select * from uptime order by date desc limit 1440) as lastDay order by lastDay.date asc';
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
  display:inline-block;
  float:left;
}
.nicetime {
  margin-bottom:7px;
  display:block;
  transform:rotate(-45deg);
}
</style>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
</head>
<body>

<div style="margin-bottom:50px;">
<h1 style="float:left;margin-right:10px">Server Status (24hr)</h1>
<div class="box" style="float:left;"></div>   = blackout<br>
<div class="box g" style="float:left;"></div> = online<br>
<div class="box r" style="float:left;"></div> = offline
</div>

<div class="col">
<?
$lastUnixTime = -1;
$coli = 0;
while($row = $results->fetch_assoc()) {
  $unixTime = strtotime( $row["date"] ); //current unix time should be 60secs less than last entry cause its desc
  $expected = $unixTime - 60;

  if( $lastUnixTime == -1 ) { //create filler
    echo '<div style="display:block;height:'.( 22 + ($unixTime%3600)*11/60 ).'px"></div>';
  } elseif( $lastUnixTime != -1 && $lastUnixTime != $expected ) {
    //ensure that both are on-the-minute stamps and delta does not exceed 100 blackout minutes (6000 seconds)
    $del = $expected -$lastUnixTime;
    newcol( ++$coli );


    if( $del < 6000 ) {
      for( $i = 0; $i < floor($del/60); $i++ ) {
        newCol( ++$coli );
        echo "<div class='box'></div>";
      }
    } else {
      echo "<div class='box'></div> ... ".($del/3600)." hour blackout ... <div class='box'></div> ";
    }
  }
  $lastUnixTime = $unixTime;
  newCol( ++$coli );

  $onoff = $row["isup"] == 1 ? 'g' : 'r';
  $niceTime = date( 'h:ia', strtotime( $row["date"] ) );
  echo "<div class='box $onoff'></div>";
}

function newCol( $coli ) {
  $cond = $coli % 60 == 0;
  if ( $cond ) {
    echo '</div><div class="col"><span class="nicetime"></span>';
  }
}
?>
</div>

<br/>
</body>
</html>