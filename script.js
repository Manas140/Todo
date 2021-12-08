// my words "js sure is hard...."
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');
const addButton = document.querySelector('.add-button');

addButton.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', getTodo);

function addTodo(event) {
  event.preventDefault();
  if (input.value != "") {
    event.preventDefault();
    const div = document.createElement("div");
    div.classList.add("todo-element")
    list.appendChild(div);
   
    const text = document.createElement('p');
    text.innerText = input.value;
    text.classList.add("todo-text");
    div.appendChild(text);
    
    // const doneButton = document.createElement('button');
    // doneButton.innerText = '✓';
    // doneButton.classList.add("done-button");
    // div.appendChild(doneButton);
    // doneButton.addEventListener('click', doneTodo);
    
    const delButton = document.createElement('button');
    delButton.innerText = '×';
    delButton.classList.add("delete-button");
    div.appendChild(delButton);
    delButton.addEventListener('click', delTodo);
    saveTodo(input.value);
    input.value = "";
  } else {
    console.log("please enter a value");
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
  todo.classList.toggle('done');
}

function saveTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    const div = document.createElement("div");
    div.classList.add("todo-element")
    list.appendChild(div);
     
    const text = document.createElement('p');
    text.innerText = todo;
    text.classList.add("todo-text");
    div.appendChild(text);
    
    // const doneButton = document.createElement('button');
    // doneButton.innerText = '✓';
    // doneButton.classList.add("done-button");
    // div.appendChild(doneButton);
    // doneButton.addEventListener('click', doneTodo);
    
    const delButton = document.createElement('button');
    delButton.innerText = '×';
    delButton.classList.add("delete-button");
    div.appendChild(delButton);
    delButton.addEventListener('click', delTodo);
  })
}

function removeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos.indexOf(todo.children[0].innerText));
  todos.splice(todos.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem('todos',JSON.stringify(todos));
}
