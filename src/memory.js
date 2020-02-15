function createMemoryForm(pinId){
  console.log("Hey, you found me!")
  console.log(pinId)
  let formContainer = document.getElementById('form-container')
  formContainer.innerHTML =  `
      <br>
      Add your memory to this location by filling out the form below:
      <br>
      <br>
      <form onsubmit="createMemory();return false;">
        <label for="date">Date (YYYY-MM-DD)</label><br>
        <input type="text" id="date"><br>
        <label for="description">Description:</label><br>
        <input type="text" id="description" ><br>
        <input type="hidden" id="pin_id" value=${pinId} >
        <input type ="submit" value="Add Memory!"><br>
    </form>  `

}

function createMemory(){
  let date = document.getElementById('date').value
  let description=  document.getElementById('description').value
  let pin_id = document.getElementById('pin_id').value
  console.log(date)
  console.log(description)
  console.log(pin_id)
}
