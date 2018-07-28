var dkey_listings = "vsbxs9pz6rq6jpb6hpv7bzeu";
var dkey_property = "pw3k7syh9c552xvqqytdbngy";

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
      if (xmlhttp.status == 200) {
        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
      }
      else if (xmlhttp.status == 400) {
        alert('There was an error 400');
      }
      else {
        //alert('something else other than 200 was returned');
        console.log('ERROR');
        console.log(xmlhttp);
      }
    }
  };


  var url = "https://api.domain.com.au/v1/listings/6311594";

  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader( "Bearer", dkey_property );
  xmlhttp.send();
}

console.log('loaded');
