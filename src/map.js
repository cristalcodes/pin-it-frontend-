const BASE_URL = "http://localhost:3000"

//Initiates Map & fetches all locations from the database
  function initMap(){
    var options = {
      zoom: 2,
      center: {lat: 42.3601, lng: -71.0589}
    }
    //Creates a new map
    var map = new google.maps.Map(document.getElementById('map'),options);

    //fetches information from backend
    fetch(BASE_URL)
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
        dropPin(pinInfo);
      })
    })

  //adds pins to the map
    function dropPin(pin){
      var marker = new google.maps.Marker({
        map: map,
        position: pin.coords,
      })

      if (pin.label){
        var infoWindow = new google.maps.InfoWindow({
          content:
          `<center><strong>${pin.label}</strong>
          <br><br>
          <a href= "#" onclick= 'createMemoryForm(${pin.id}); infoWindow.close();'> Add a Memory </a></center><br>
          <a href= "#" onclick= 'seeAllMemoriesForPin(${pin.id});'> See Memories </a></center>`
        });

      marker.addListener('click', function(){
          infoWindow.open(map, marker);
        })

      }
    }
  }


//Add new pin form:
  function addAPin(){
    let contentContainer = document.getElementById('content-container')
    contentContainer.innerHTML=""
    let formContainer = document.getElementById('form-container')
    formContainer.innerHTML = `
    <br>
    <br>
    <form onsubmit="createPin();return false;">
        <label for="label">Label as:</label><br>
        <input type="text" id="label"><br><br>
        <label for="address">Address:</label><br>
        <input type="text" id="address" ><br>
        ex. 123 Flatiron Way or Disneyland<br><br>
        <input type ="submit" value="Add Pin!"><br>
    </form>  `

  }

// Clears the form
  function clearForm(){
    let contentContainerDiv = document.getElementById('form-container')
    contentContainerDiv.innerHTML = " "
  }

//creates a new Pin
  function createPin(){
    let formContainer = document.getElementById('form-container')

    const pin = {
       label: document.getElementById('label').value,
       address: document.getElementById('address').value,
    }

    fetch(BASE_URL+'/pins', {
      method: "POST",
      body: JSON.stringify(pin),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    clearForm();

    formContainer.innerHTML = "Refresh to update the map!"

  }

//Not 100% sure I would want to see this.
  function seeAllPins(){
    clearForm();
    let contentContainer = document.getElementById('content-container')
    contentContainer.innerHTML = "<br>Look at all the places you've been to:<br>"
    fetch("http://localhost:3000")
    .then(response => response.json())
    .then(jsonData => {
    //iterates through each location object & sets variables
      jsonData.map((location) =>  {
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
        console.log(pinInfo)
        contentContainer.innerHTML += `
        <br>
        ${pinInfo.label}`
      })
    })

  }
