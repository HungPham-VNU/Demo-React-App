// ------------------ LƯU / ĐỌC LOCAL STORAGE -------------------

function getTodos() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = getTodos();

// ------------------ RENDER TODO (COMPONENT ĐƠN GIẢN) ---------------------

function renderTodos(container, filterCompleted = null) {
    container.innerHTML = "";

    todos
        .filter(todo => filterCompleted === null || todo.completed === filterCompleted)
        .forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
          <span class="${todo.completed ? "done" : ""}">${todo.text}</span>
          <div>
            <button onclick="toggleTodo(${todo.id})">✓</button>
            <button onclick="editTodo(${todo.id})">Sửa</button>
            <button onclick="deleteTodo(${todo.id})">X</button>
          </div>
        `;
            container.appendChild(li);
        });
}

// ------------------ CRUD ----------------------

function addTodo() {
    const input = document.getElementById("todo-input");
    if (!input || !input.value.trim()) return;

    todos.push({
        id: Date.now(),
        text: input.value.trim(),
        completed: false,
    });

    input.value = "";
    saveTodos(todos);
    init();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    init();
}

function toggleTodo(id) {
    todos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTodos(todos);
    init();
}

function editTodo(id) {
    const newText = prompt("Nhập nội dung mới:");
    if (!newText) return;

    todos = todos.map(t =>
        t.id === id ? { ...t, text: newText } : t
    );

    saveTodos(todos);
    init();
}

// ------------------ STATS ----------------------

function renderStats() {
    const total = todos.length;
    const done = todos.filter(t => t.completed).length;
    const left = total - done;

    document.getElementById("total").textContent = total;
    document.getElementById("done").textContent = done;
    document.getElementById("left").textContent = left;
}

// ------------------ INIT (GIẢ ROUTER) ----------------------

function init() {
    if (document.getElementById("todo-list")) {
        renderTodos(document.getElementById("todo-list"));
    }

    if (document.getElementById("todo-completed")) {
        renderTodos(document.getElementById("todo-completed"), true);
    }

    if (document.getElementById("total")) {
        renderStats();
    }
}

init();

// ------------------ EVENTS ----------------------

const addBtn = document.getElementById("add-btn");
if (addBtn) addBtn.onclick = addTodo;
