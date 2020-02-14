
//Initiates Map
function initMap(){
    var options = {
      zoom: 1,
      center: {lat: 42.3601, lng: -71.0589}
    }
  //Creates a new map
  var map = new google.maps.Map(document.getElementById('map'),options);

  //fetches information from backend
  fetch("http://localhost:3000")
  .then(response => response.json())
  .then(jsonData => {
  //iterates through each location object & sets variables
    jsonData.forEach((location) =>  {
      let pinId = location['id'];
      let pinLabel = location['label'];
      let pinLatitude = location['latitude'];
      let pinlongitude = location['longitude'];
  //creates a pin using above variables
      pinInfo = {
        id: pinId,
        label: pinLabel,
        coords: {
          lat: pinLatitude,
          lng: pinlongitude
        }
      }
  //calls the addMarker function and passes the pinInfo object as a param
      addMarker(pinInfo);
    })
  })


//adds pins to the map
  function addMarker(pin){
    var marker = new google.maps.Marker({
      map: map,
      position: pin.coords,
    })

    if (pin.label){
      var infoWindow = new google.maps.InfoWindow({
        content:
        `<center><strong>${pin.label}</strong>
        <br>
        <a href= "#" onclick= 'seeMemories();'> See Memories </a></center>`
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

}
