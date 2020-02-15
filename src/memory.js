
function createMemoryForm(pinId){
  console.log("Hey, you found me!")
  console.log(pinId)
  let formContainer = document.getElementById('form-container')
  formContainer.innerHTML =  `
      <br>
      Add your memory to this location by filling out the form below:
      <br>
      <br>
      <form onsubmit="createAndDisplayMemory();return false;">
        <label for="date">Date (YYYY-MM-DD)</label><br>
        <input type="text" id="date"><br>
        <label for="description">Description:</label><br>
        <input type="text-area" id="description" ><br>
        <input type="hidden" id="pin_id" value=${pinId} >
        <input type ="submit" value="Add Memory!"><br>
    </form>  `

}

function createAndDisplayMemory(){
  let contentContainer = document.getElementById('content-container')
  let date = document.getElementById('date').value
  let description=  document.getElementById('description').value
  let pin_id = document.getElementById('pin_id').value

  const memory = {
    date: date,
    description: description,
    pin_id: pin_id
  }

  fetch(BASE_URL+'/memories', {
    method: "POST",
    body: JSON.stringify(memory),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    let formContainer = document.getElementById('form-container')
    formContainer.innerHTML =""
    contentContainer.innerHTML = `
    <br>
    Date: <br>
    ${jsonData.date}<br><br>
    Description:<br>
     ${jsonData.description}
    `
  })
}
