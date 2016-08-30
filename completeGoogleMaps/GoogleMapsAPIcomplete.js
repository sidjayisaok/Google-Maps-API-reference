// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//variables used
var map;
var infowindow;
//start map protocol
function initMap() {
  var searchResults = {lat: 40.7128, lng: -74.0059};
  map = new google.maps.Map(document.getElementById('map'), {
    center: searchResults,
    zoom: 10
  });
  //sets up info window
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: searchResults,
    radius: 1000,
    // change the types using https://developers.google.com/places/supported_types as a reference
    type: ['store']
  }, callback);
}
//pulls up markers
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
//creates markers
function createMarker(place) {
  var marker;
  //don't change this url or so help me God...
  var ourIcon = new google.maps.MarkerImage("https://i.imgur.com/beAXMxQ.png");

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker ='';
  }
  //markers working via this script
  var placeLoc = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: ourIcon
  });
  //listener event can be rewritten but leave it as is for now
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  }
  // trying to implement search, this is pulling up the latitude and longitude
  //figure out how to change the latitude and longitude into search factors
  function searchFunc(){
    var geocoder = new google.maps.Geocoder();
    var address;
    var models = require('../models');
    models.Game.findOne(where: {userId: }).then(function(game){
      address = game.address + " " + game.city + " " + game.state + " " + game.zipcode;  
    });
    var longitude;
    var latitude;
    geocoder.geocode({ 'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      //attempting search fix
      var searchResults = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      map = new google.maps.Map(document.getElementById('map'), {
        center: searchResults,
        zoom: 15
      });
      //sets up info window
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: searchResults,
        radius: 1000,
        // change the types using https://developers.google.com/places/supported_types as a reference
        type: ['store']
      }, callback);
      }
    });
  }
