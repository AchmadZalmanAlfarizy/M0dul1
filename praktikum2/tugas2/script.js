let todoList = [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        todoList.push({ text: todoText, isEditing: false });
        todoInput.value = '';
        renderTodos();
    }
}

function deleteTodo(index) { 
    todoList.splice(index, 1);
    renderTodos();
}

function editTodo(index) {
    todoList[index].isEditing = true;
    renderTodos();
}

function saveTodo(index) {
    const editInput = document.getElementById(`edit-input-${index}`);
    const newText = editInput.value.trim();

    if (newText !== '') {
        todoList[index].text = newText;
        todoList[index].isEditing = false;
        renderTodos();
    }
}

function cancelEdit(index) {
    todoList[index].isEditing = false;
    renderTodos();
}

function renderTodos() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    todoList.forEach((todo, index) => {
        const todoItem = document.createElement('li');

        if (todo.isEditing) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = todo.text;
            editInput.id = `edit-input-${index}`;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.className = 'edit-button';
            saveButton.onclick = () => saveTodo(index);

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.onclick = () => cancelEdit(index);

            const editModeContainer = document.createElement('div');
            editModeContainer.className = 'edit-mode';
            editModeContainer.appendChild(editInput);
            editModeContainer.appendChild(saveButton);
            editModeContainer.appendChild(cancelButton);

            todoItem.appendChild(editModeContainer);
        } else {
            const todoText = document.createElement('span');
            todoText.textContent = todo.text;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.onclick = () => editTodo(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTodo(index);

            todoItem.appendChild(todoText);
            todoItem.appendChild(editButton);
            todoItem.appendChild(deleteButton);
        }

        todoListElement.appendChild(todoItem);
    });

// Mendapatkan data to-do dari localStorage
function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// Menyimpan data to-do ke localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi untuk menambahkan to-do
function addTodo() {
    const input = document.getElementById('todo-input');
    const task = input.value.trim();

    if (task) {
        const todos = getTodos();
        todos.push(task);
        saveTodos(todos);
        renderTodos();
        input.value = '';
    }
}

// Fungsi untuk menghapus to-do
function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Fungsi untuk menampilkan to-do list
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const todos = getTodos();

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${todo} <button onclick="deleteTodo(${index})">Delete</button>`;
        todoList.appendChild(li);
    });
}

// Menampilkan to-do list saat halaman dimuat
window.onload = function() {
    renderTodos();
};

}
