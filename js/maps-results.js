
var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(35.903928, -79.046243);
  var mapOptions = {
    zoom: 7,
    center: latlng,
    styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#56a0d3"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":70}]}]
  }
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  console.log('inside initialize function');
  code_addresses();

}

function code_addresses() {

  // make variable global so I can use info window in function below?
  var addresses = [
    'Chapel Hill, NC',
    'Lincolnton, NC',
    'Raleigh, NC'
  ];
  
  for(var i=0; i < addresses.length; i++) {
      console.log('inside for loop')
      codeAddress(addresses[i]);
  }
}

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);

      var contentString = 'It works!';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: '../img/marker.png'
      });
      console.log(results[0].formatted_address);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);



