// my words "js sure is hard...."
document.addEventListener('DOMContentLoaded', getTodo);
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addTodo);

let Todo;
if (localStorage.getItem("Todo") === null) {
  Todo = [];
} else {
  Todo = JSON.parse(localStorage.getItem("Todo"));
}

function createTodo(event) {
  list.innerHTML += 
  ` <div class="todo-element">
      <p class="todo-text">${event}</p>
      <button class="delete-button">×</button>
    </div>
  `;
  document.querySelectorAll(".delete-button").forEach(function(button) {
    button.addEventListener('click', delTodo);  
  })
  document.querySelectorAll(".todo-element").forEach(function(div) {
    div.addEventListener('click', doneTodo);  
  })
}

function addTodo(event) {
  event.preventDefault();
  if (input.value != "") {
    event.preventDefault();
    createTodo(input.value);
    saveTodo(input.value);
    input.value = "";
  }
}

function delTodo(event) {
  event.preventDefault();
  todo = event.target.parentElement; 
  removeTodo(todo);
  list.removeChild(event.target.parentElement);
}

function doneTodo(event){
  event.preventDefault();
  todo = event.target.parentElement; 
  // removeTodo(todo);
  todo.classList.toggle('done');
}

function saveTodo(todo) {
  Todo.push(todo);
  localStorage.setItem('Todo',JSON.stringify(Todo));
}

function getTodo() {
  Todo.forEach(function(todo) {
    createTodo(todo);
  })
}

function removeTodo(todo) {
  Todo.splice(Todo.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem('Todo',JSON.stringify(Todo));
}
