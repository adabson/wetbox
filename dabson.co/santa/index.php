<?php
//howto:
//1. Get list of people this year
//2. in dev console, shuffle('peeps') & hardcode

$peeps = ["Somin", "Inkeri", "Andrew", "Jonathan", "Anna", "Maddy", "David ", "Woong", "Raymond", "Heesong", "Micahela", "Michael", "Andra", "Tim"];
$db = json_decode( utf8_encode( file_get_contents( "phatFile.dat" ) ), true );


if( $_POST[ 'name' ] ) {
//Should only define peeps once (we want it in php to sanitise)
$CHAR_LIMIT = 500;
  $name  = in_array( $_POST[ "name" ], $peeps ) ? $_POST[ "name" ] : "";
  $wants = preg_replace( "/[^a-zA-Z0-9 -_'\n!@#$%^&*().!?~]/", "", $_POST[ "wants" ] );
  $wants = substr( $wants, 0, $CHAR_LIMIT );

  if( $name != "" ) {
    $db[$name] = $wants;
    file_put_contents( 'phatFile.dat', json_encode( $db ) );
    echo '<html>Saved. <a href="">Return</a></html>';
    exit();
  }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Santa!</title>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<style>
body{
	margin:0;
	padding:0;
  font-family:Arial,Helvetica,sans-serif
;}
textarea{
  width:500px;
  height:250px;
}
#yssi{
	display:none;
}
</style>
</head>
<body>

What is your name?
<input type="text" name="name" id="name">
<input type="submit" value="go" id="subsub">


<div id="yssi">
  <div id="ss"></div>
  <div id="me"></div>
</div>


<script>
<? 
  echo "var peeps =   ".json_encode( $peeps ).";\n";
  echo "var desires = ".json_encode( $db ).";\n";
?>

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function capitalizeFirstLetter(string) {
	string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('#subsub').click( function() { 
	var theName = capitalizeFirstLetter($('#name').val());
	var nameIndex = peeps.indexOf(theName);

	if( !isInArray(theName, peeps) ) {
    var sortedPeeps = peeps.slice();
    sortedPeeps.sort(); // sort preserves state
		alert('Could not find your name. Did I misspell you?\n' + sortedPeeps.toString().replace(/,/g,'\n') );
  } else {
    var buyingFor = peeps[(nameIndex+1)%peeps.length];
    var iWant = desires[peeps[nameIndex]];
    var theyWant = desires[peeps[(nameIndex+1)%peeps.length]];

    iWant = iWant == undefined ? '' : iWant;
    theyWant = theyWant == undefined ? '' : theyWant;

		$('#ss').html('<br><h1>Hi '+theName+'.<br>You are a secret santa for: '+buyingFor+'</h1><i>'+buyingFor+' wants...</i><br><textarea readonly>'+theyWant+'</textarea>');

    $('#me').html('<h2>So what does '+theName+' want?</h2><i>'+theName+' wants...</i><form method="post"><input type="hidden" name="name" value="'+theName+'"><textarea name="wants" maxlength="<? echo $CHAR_LIMIT; ?>">'+iWant+'</textarea><br><input type="submit" value="Save"></form>');

		$('#yssi').show();
	}
});

$('#name').keypress(function(e){ //this is a horrible tack-on, all because I couldn't get jquery's .submit() working without reloading the page
    if(e.which == 13){        // Enter key pressed
        $('#subsub').click(); // Trigger search button click event
    }
});


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

</script>
</body>
</html>