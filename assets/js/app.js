const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// --- FUNZIONI DI SUPPORTO PER IL LOCALSTORAGE ---

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- FUNZIONE PRINCIPALE PER RENDERIZZARE LA LISTA ---

function renderTasks() {
  taskList.innerHTML = "";

  const tasks = getTasks();
  tasks.forEach((task) => {
    const listItem = document.createElement("li");

    if (task.completed) {
      listItem.classList.add("completed");
    }

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    taskSpan.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks(tasks);
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      const newTasks = tasks.filter((t) => t.text !== task.text);
      saveTasks(newTasks);
      renderTasks();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}

// --- GESTIONE DEGLI EVENTI PRINCIPALI ---

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value;

  if (taskText.trim() === "") {
    alert("Per favore, inserisci un compito.");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);
  renderTasks();

  taskInput.value = "";
});

// --- CARICAMENTO INIZIALE ---

renderTasks();
