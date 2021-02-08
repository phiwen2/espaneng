const init = () => {
  let address = document.querySelector('.address');
  let region = document.querySelector('.region');

  const success = (data) => {
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;

    //  init reverseGeocode
    reverseGeocode(latitude, longitude);
  }
  if(navigator.geolocation){
    window.navigator.geolocation
      .getCurrentPosition(success, console.error, options = {
        enableHighAccuracy: true,
      });
  }


  const reverseGeocode = (latitude, longitude) => {
    var apikey = '2343a1bdc3834be5993e5a85c3557682';
    var latitude = latitude;
    var longitude = longitude;

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
      + '?'
      + 'key=' + apikey
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function() {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        // log results
        console.log(data.results[0].formatted); // print the location
        console.log(data.results[0].components.county);

        // display to 
        address.innerHTML = data.results[0].formatted;
        region.innerHTML = data.results[0].components.county;
      } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error
                            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log("unable to connect to server");        
    };

    request.send();  // make the request 

  }

}