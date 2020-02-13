//Initiates Map
function initMap(){
  var options = {
    zoom: 1,
    center: {lat: 42.3601, lng: -71.0589}
  }
  //Creates a new map
  var map = new google.maps.Map(document.getElementById('map'),options);

  //Listen for click on map & //add marker
  google.maps.event.addListener(map, 'click', function(event){
     addMarker({coords:event.latLng});
  });


  //Array of Markers
  var markers =[
    {
      coords: {lat: 42.4668, lng: -70.9495},
       content: '<h1>Lynn MA</h1>'
    },
    {
      coords: {lat: 34.6868 , lng: -118.1542}
    },
    {
      coords: {lat: 35.8826 , lng: -80.0820}
    }

  ];


  //Loop through Markers
  for (var i=0; i< markers.length; i++){
    addMarker(markers[i]);
  }




   //Add Marker Function
     function addMarker(props){
       var marker = new google.maps.Marker({
         map: map,
         position: props.coords,
       })

       if (props.content){
         var infoWindow = new google.maps.InfoWindow({
           content: props.content
         });

         marker.addListener('click', function(){
           infoWindow.open(map, marker);
         });
       }
     }


}
