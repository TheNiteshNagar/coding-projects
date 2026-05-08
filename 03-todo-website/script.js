const todoList = document.getElementById('todo-lists')
const form = document.getElementById('todo-form');
const input = document.getElementById('todo')
let todos = []

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTodo = input.value;

    console.log('Todo: ', newTodo)

    todos.push(newTodo)

    const liTodo = document.createElement('li')
    liTodo.textContent = newTodo
    todoList.appendChild(liTodo)

    localStorage.setItem('myTodos', todos)

    input.value = ''
} )
