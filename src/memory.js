// <!-- function attachClickToTodoLinks(){
//     let todos = document.querySelectorAll("li a")
//     todos.forEach(todo =>{
//         todo.addEventListener('click', displayTodo)
//     })
// }

// function displayCreateForm(){
//     let memoryForm = document.getElementById("memory-form")
//     let html = `
//         <form onsubmit="createTodo();return false;">
//         <label>Description:</label>
//         <input type ="text" id="description"></br>
//         <label>Compete:</label>
//         <input type ="checkbox" id="completed"></br>
//         <input type ="submit" value="Create Todo">
//     `
//     todoFormDiv.innerHTML = html
// } -->

window.addEventListener('load', () => {
    getTodos()
    attachClickToTodoLinks()
})
class Memory {
  constructor(memory) {
    this.id = memory.id
    this.date = memory.date
    this.description = memory.description
    this.pin_id = memory.pin_id
  }

  function displayCreateMemoryForm(){
    console.log("HEY IN HERE!")
  }


}
