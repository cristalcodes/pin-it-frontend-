const BASE_URL = "http://localhost:3000"
//Side Bar

// function toggleSidebar(){
//   document.getElementById("sidebar").classList.toggle('active');
// }



function createPlaceForm(){
  document.innerHTML= ""
  let contentContainer = document.getElementById('form-container')
  console.log("Bananas")

  contentContainer.innerHTML = `
  <br>
  <br>
  <form onsubmit="createPlace();return false;">
      <label for="label">Location label:</label><br>
      <input type="text" id="label"><br>
      <label for="address">Address:</label><br>
      <input type="text" id="address" ><br>
      ex. 123 Flatiron Way or Disneyland<br><br>
      <input type ="submit" value="Add Place"><br>
  </form>  `

}

function createPlace(){
  const place = {
     label: document.getElementById('label').value,
     address: document.getElementById('address').value,
     latitude: 0,
     longitude: 0
  }
  fetch(BASE_URL+'/pins', {
    method: "POST",
    body: JSON.stringify(place),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  // .then(resp => console.log(resp.json()))
  // .then(place => console.log(place))

  clearForm();
  let formContainer = document.getElementById('form-container')
  formContainer.innerHTML = "Refresh to see your new pin!"

}



// function createNewToyEventListener (){
//   const addToyForm = document.querySelector('.add-toy-form')
//   addToyForm.addEventListener('submit', function(event){
//     event.preventDefault();
//     let toyName = event.target.getElementsByTagName("input")[0].value
//     let toyImageSource = event.target.getElementsByTagName("input")[1].value
//
//     fetch("http://localhost:3000/toys", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json"
//             },
//             body: JSON.stringify({
//             "name": `${toyName}`,
//             "image": `${toyImageSource}`,
//             "likes": 0
//             })
//       })
//
//   })
// }








function clearForm(){
  let contentContainerDiv = document.getElementById('form-container')
  contentContainerDiv.innerHTML = " "
}



// function displayPlaces(){
//   clearForm();
//   let contentContainer = document.getElementById('content-container')
//
//
//   contentContainer.innerHTML =""
//   fetch("http://localhost:3000")
//   .then(response => response.json())
//   .then(jsonData => {
//   //iterates through each location object & sets variables
//     contentContainer.innerHTML += jsonData.map((location) =>  {
//       let pinId = location['id'];
//       let pinLabel = location['label'];
//       let pinLatitude = location['latitude'];
//       let pinlongitude = location['longitude'];
//   //creates a pin using above variables
//
//       pinInfo = {
//         id: pinId,
//         label: pinLabel,
//         coords: {
//           lat: pinLatitude,
//           lng: pinlongitude
//         }
//       }
//
//       `${pinInfo}`
//
//
//     })
// })
// }
