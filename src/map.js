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
          <a href= "#" onclick= 'createMemoryForm(${pin.id});'> Add a Memory </a><br>
          <a href= "#" onclick= 'seeAllMemoriesForPin(${pin.id});'> See Memories </a></center>
          <a href= "#" onclick= 'deleteThisPinWarning(${pin.id},"${pin.label}");'> Delete Pin </a></center>`
        });

      marker.addListener('click', function(){
          infoWindow.open(map, marker);
          let contentContainer = document.getElementById('content-container')
          contentContainer.innerHTML=""
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
  function clearContentContainer(){
    let contentContainer= document.getElementById('content-container')
    contentContainer.innerHTML = " "
  }

//creates a new Pin
  function createPin(){
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

    clearContentContainer();
    let contentContainer= document.getElementById('content-container')
    contentContainer.innerHTML = "Refresh to update the map!"

  }


  function seeAllPins(){
    clearContentContainer();
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


        if (pinInfo.coords.lat !== null){
        contentContainer.innerHTML += `
        <br>
        ${pinInfo.label} - <a href= "#" onclick= 'seeAllMemoriesForPin(${pinInfo.id});'> See Memories </a>`
        }

      })
    })

  }

  function deleteThisPinWarning(pinId, pinLabel){
    console.log( `${pinId}. ${pinLabel} . Are you sure? Deleting this pin will delete all associated memories.`)
    let oldInfoWindowText = event.target.parentElement.innerHTML
    let infoWindow = (event.target.parentElement)
    infoWindow.innerHTML = `
    Are you sure? Deleting this pin will delete all associated memories.<br><br>
    <a href='#' onClick= 'yesDeletePin(${pinId})'; return false;>Yes, Delete This Pin!</a><br><br>
    <a href='#' onClick= 'noDontDelete(${pinId}, "${pinLabel}")'; return false;>Just kidding! Don't Delete!</a>`

  }


  function yesDeletePin(pinId){
    fetch(BASE_URL +`/pins/${pinId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    let infoWindow = (event.target.parentElement)
    infoWindow.innerHTML = "This pin has been deleted. Refresh the page to update the map."

  }

  function noDontDelete(pinId, pinLabel){
    let infoWindow = (event.target.parentElement)
    infoWindow.innerHTML = `<center><strong>${pinLabel}</strong>
    <br><br>
    <a href= "#" onclick= 'createMemoryForm(${pinId});'> Add a Memory </a><br>
    <a href= "#" onclick= 'seeAllMemoriesForPin(${pinId});'> See Memories </a></center>
    <a href= "#" onclick= 'deleteThisPinWarning(${pinId});'> Delete Pin </a></center>`
  }
