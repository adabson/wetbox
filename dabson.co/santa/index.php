<?php
//Should only define peeps once (we want it in php to sanitise)
$CHAR_LIMIT = 500;

$peeps = array( "Inkeri", "Maddy", "Michael", "Chet", "Raymond", "Andra", "Somin", "David", "Andrew", "Woong", "Michaela", "Jonathan", "Timothy");
$db = json_decode( utf8_encode( file_get_contents( "phatFile.dat" ) ), true );

//echo '!!'.json_encode( $peeps ); //json makes converting a php array to js array easy as 1 2 3 :)
//echo json_encode( $db );

if( $_POST[ 'name' ] ) {
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
// peepsCURRENT_YEAR = shuffle ( [ 'Andrew', 'David', 'Inkeri', 'Jonathan', 'Michael', 'Michaela', 'Raymond', 'Somin', 'Timothy', 'Woong' ] );
// append year after archiving

/*

$peeps2016 = array( "Michaela", "Somin", "Raymond", "David", "Timothy", "Woong", "Inkeri", "Jonathan", "Michael", "Andrew" );
var peeps2015 = [ 'Raymond', 'Andrew', 'Jonathan', 'Anna', 'Andra', 'Inkeri', 'David', 'Michaela', 'Timothy', 'Michael', 'Somin' ]; //p[0] buys for p[1] buys for p[2] etc.
var peeps = [ 'Michaela', 'Somin', 'Raymond', 'David', 'Timothy', 'Woong', 'Inkeri', 'Jonathan', 'Michael', 'Andrew' ];


[ 'Raymond', 'Inkeri', 'Andrew', 'Timothy', 'Jonathan', 'Somin', 'Woong', 'Michael', 'Andra', 'Michaela', 'David', 'Maddy', 'Chet' ]

var desires2015 = ["Raymond wants Chocolate / Chocolate Ginger / A Short sleeved shirt (inexpensive) / Ear Plugs to fit my iPhone 5", 
"Andrew wants: Beach towel / Cheap backpack / Book: Rich dad poor dad / Dark choc",
"Jonathan wants cool shirt or health and fitness book or magazine", 
"Anna wants a CD: Ben Howard or a new set of steel guitar strings or a nice simple maybe geometric pattern table cloth( not pinks/purples etc though please)", 
"Andra wants a cute plant - maybe a succulent (not a cactus!) / the third Hobbit DVD / yummy dried fruit", 
"Inkeri wants anything to do with art / sketching pens, pencils, pads, books, art history dvd by BBC / pleasant fragrances, verbena, citrus, grape, floral/herbal in creams,potions lotions, candles, pillows whatever / random surprises of any kind so Santa can really do whatever but avoid super scary thriller movies",
"David wants usb/thumb drive / CD classical/jazz or socks", 
"Michaela wants mass quantities of raw cashews/brazils/almonds/walnuts / Alt-J's new album! / a black-paged A3 artbook.", 
"Timothy wants a Stanley knife / Calender (maybe space/ earth/serenity) / pouch to hold phone when running 7x14cm phone / a microfiber cloth / book (maybe fantasy)", 
"Michael wants Scottish calendar / A long sleeve shirt - 46 neck - (not slim-fit!) /Some succulent best quality super-duper,  tinned Cat food, and Dog food from the supermarket", 
"Somin wants Hario V60 dripper ceramic (which is a coffee dripper) or super cute short pyjama pants kkk or a hand cream"];

var desires = [ "", "", "", "", "", "", "", "", "", "LoL giftcard" ];
*/

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