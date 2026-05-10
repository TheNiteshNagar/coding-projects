const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load tasks when page opens
async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    todoList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
}

async function addTask() {
    const title = todoInput.value;
    if (!title) return;

    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    
    const newTask = await res.json();
    renderTask(newTask);
    todoInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.title}</span>
        <button onclick="deleteTask(${task.id}, this)">Delete</button>
    `;
    todoList.appendChild(li);
}

async function deleteTask(id, btn) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    btn.parentElement.remove();
}

loadTasks();