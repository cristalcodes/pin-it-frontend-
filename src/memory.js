
function createMemoryForm(pinId){
  console.log("The function createMemoryForm has been triggered. The form should be displayed below the map.")
  console.log(`This pin has an id of ${pinId}`)
  let contentContainer = document.getElementById('content-container')
  contentContainer.innerHTML =  `
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
  console.log("The createAndDisplayMemory function has been triggered. You should see your memory displayed below the map.")
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
  .then(memory => {
    contentContainer.innerHTML =""
    contentContainer.innerHTML = `
    <br>
    Date: <br>
    ${memory.date}<br><br>
    Description:<br>
     ${memory.description}<br>
     <a href='#' onClick='editThisMemory(${memory.id})'; return false;>Edit this Memory</a><br>
     <a href= "#" onClick= 'deleteThisMemoryWarning(${memory.id});'> Delete Memory </a>
    `
  })
}

function seeAllMemoriesForPin(pinId){
  console.log(`This pin has an id of ${pinId}`)
  let contentContainer = document.getElementById('content-container')
  contentContainer.innerHTML=""

  fetch(BASE_URL+`/pins/${pinId}`)
  .then(response => response.json())
  .then(pin => {
    if (pin.memories[0] != null){
      for (let i=0; i < pin.memories.length; i++){

        contentContainer.innerHTML += `
        <br>
        <div>${pin.memories[i].date}</a>| ${pin.memories[i].description} | <a href='#' onClick='editThisMemory(${pin.memories[i].id})'; return false;>Edit</a> | <a href='#' onClick='deleteThisMemoryWarning(${pin.memories[i].id})'; return false;>Delete</a></div><br>
        `
      }
    } else {
      contentContainer.innerHTML = "<br>You don't currently have any memories at this location!"

    }

  })

}

function editThisMemory(memoryId){
  console.log(`This memory has an id of ${memoryId}`)
  let contentContainer = document.getElementById('content-container')
  contentContainer.innerHTML = ""
    fetch(BASE_URL + `/memories/${memoryId}`)
    .then(resp => resp.json())
    .then(memory =>
      {
        contentContainer.innerHTML = `
          <br>
            <form onsubmit="updateMemory(${memory.id});return false;">
            <label>Date:</label><br>
            <input type ="text" id="date" value="${memory.date}"></br><br>
            <label>Description:</label><br>
            <input type ="text" id="description" value = "${memory.description}"></br><br>
            <input type="hidden" id="pin_id" value=${memory.pin_id} >
            <input type ="submit" value="Submit">
        `
    }
  )
}

function updateMemory(memoryId){
  console.log(`Is this the same memory as above? ${memoryId}`)

  let contentContainer = document.getElementById('content-container')

  const memory = {
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
    pin_id: document.getElementById('pin_id').value
  }


  fetch(BASE_URL + `/memories/${memoryId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(memory)
    })
    .then(response => response.json())
    .then(memory => {
      contentContainer.innerHTML =""
      contentContainer.innerHTML = `
      <br>
      Date: <br>
      ${memory.date}<br><br>
      Description:<br>
       ${memory.description}<br><br>
       <a href='#' onClick='editThisMemory(${memory.id})'; return false;>Edit this Memory</a><br>
       <a href= "#" onClick= 'deleteThisMemoryWarning(${memory.id});'> Delete Memory </a></center>
      `
    })

}

function deleteThisMemoryWarning(memoryId){
  console.log(`The current memory id is ${memoryId}`)
  let contentContainer = document.getElementById('content-container')
  contentContainer.innerHTML = ""
  contentContainer.innerHTML += `
  <br>
  Are you sure you want to delete this memory?<br><br>
  <a href='#' onClick= 'yesDeleteMemory(${memoryId})'; return false;>Yes, Delete This Memory!</a><br><br>
  `
}

function yesDeleteMemory(memoryId){
  console.log(`The current memory id is ${memoryId}`)
  let contentContainer = document.getElementById('content-container')
  contentContainer.innerHTML = ""
  fetch(BASE_URL +`/memories/${memoryId}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })

  contentContainer.innerHTML = "This memory has been deleted."


}
