var locations =[
  []
];

var map;
var geocoder;
var markers = [];
var bounds = new google.maps.LatLngBounds();

//this initializes our search geocaching
function searchAddress(){
  var addressInput = document.getElementById('address-input').value;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({
    address: addressInput
  }, function(results, status){
      if (status === google.maps.GeocoderStatus.OK){
        var myResults = results[0].geometry.location;

        createMarker(myResults);

        map.setCenter(myResults);
        //final result zoom level
        map.setZoom(12);
      }
  });
}

//this creates our marker
function createMarker(results){
  var marker;
  //don't change this url or so help me God...
  var ourIcon = new google.maps.MarkerImage("https://i.imgur.com/beAXMxQ.png");

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker ='';
  }

  //information for info window
  var contentString = '<div>This is test info<div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
  //this might show multiple results
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location:{lat: 40.7128, lng: -74.0059},
    radius: 500,
    type: ['postal_code']
  }, callback);
  //marker information, change position back to results if broken
  marker = new google.maps.Marker({
      map: map,
      position: results,
      animation: google.maps.Animation.DROP,
      icon: ourIcon
    });
  //listener for info window
  marker.addListener('click', function(){
    //change this back to marker if any issues
    infoWindow.open(map, this);
    //not sure what this line does
    infoWindow.setContent(place.name);
  });
  //this should push marker to the empty array
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
 for (var i = 0; i < markers.length; i++) {
   markers[i].setMap(map);
 }
}

//this is connected to the service variable in createMarker();
function callback(results, status) {
 if (status === google.maps.places.PlacesServiceStatus.OK){
   for (var i = 0; i < results.length; i++) {
     createMarker(results[i]);
   }
 }
}

//this launches google maps
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //this is set to NYC
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //attempting to get multiple returns working
  geocoder = new google.maps.Geocoder();

  for (i = 0; i < locations.length; i++){
    geocodeAddress(locations, i);
  }
}
//connected with multiple array returns above
google.maps.event.addDomListener(window, "load", initMap);

//Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
 setMapOnAll(null);
}

//Shows any markers currently in the array.
function showMarkers() {
 setMapOnAll(map);
}
