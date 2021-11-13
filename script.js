const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value==="") {
        return;
    }
    addTodo({text:input.value, completed: false});
    updateLocalStorage();
    input.value = "";
})

function addTodo(todo) {
    let todoText = "";

    todoText = todo.text;
    const todoEl = document.createElement("li");
    todoEl.textContent = todoText;
    if (todo.completed === true) {
    todoEl.classList.add("completed");
    }
    todosUl.appendChild(todoEl);

        todoEl.addEventListener("click", () => {
        todoEl.classList.add("completed");
        updateLocalStorage();
    })

    todoEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        todoEl.classList.remove("completed");
        updateLocalStorage();
    })

    todoEl.addEventListener("dblclick", () => {
        todosUl.removeChild(todoEl);
        updateLocalStorage();
    })
}

function updateLocalStorage() {
    todosEl = document.querySelectorAll("li");

    const todos = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}
