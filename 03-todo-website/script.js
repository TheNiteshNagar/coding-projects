const todoForm = document.getElementById('todo-form');
const inputTodo = document.getElementById('input-todo');
const todosList = document.getElementById('todos-list');

const key = 'localStorageTodos'         // I'm Greatest Coder I thougth why not to name it as key to access local storage
let todos = [];

// Fetch All Todos From LocalStorage and Set into todos array on window load
window.addEventListener('load', fetchLocalTodos);

// Run On Submit Button
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();     // Prevent Reload I'm Not Using Ai i forget everytime so I Addded this comment here!!!
    
    const inputTodoValue = inputTodo.value.trim();

    if(inputTodoValue !== '') {
        todos.push(inputTodoValue);
        saveTodos();
        renderTodos();
        inputTodo.value = '';
    }
});


function saveTodos() {
    localStorage.setItem(key, JSON.stringify(todos));
}


function fetchLocalTodos() {
    const saveTodos = localStorage.getItem(key);
    if(saveTodos) {
        todos = JSON.parse(saveTodos);
        renderTodos();
    }
}

function renderTodos() {
    todosList.innerHTML = ''

    todos.forEach((todoText, index) => {
        const newTodoList = document.createElement('li');
        newTodoList.innerHTML = `<span>${todoText}</span>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);

            saveTodos();

            renderTodos();
        })

        newTodoList.appendChild(deleteBtn);
        todosList.appendChild(newTodoList);
    })
}