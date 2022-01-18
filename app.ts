const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos: {text: string, completed: boolean}[] = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener("submit", (e): void => {
    e.preventDefault();
    if (input.value==="") {
        return;
    }
    addTodo({text:input.value, completed: false});
    updateLocalStorage();
    input.value = "";
})

function addTodo(todo: {text: string, completed: boolean} ): void {
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

function updateLocalStorage(): void {
    todosEl = document.querySelectorAll("li");

    const todos: {text: string, completed: boolean}[] = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}
