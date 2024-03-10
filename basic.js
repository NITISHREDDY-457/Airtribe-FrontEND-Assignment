let tasks = [];

function updateCounts() {
  document.getElementById("notStartedCount").textContent = tasks.filter(
    (task) => task.status === "notStarted"
  ).length;
  document.getElementById("inProgressCount").textContent = tasks.filter(
    (task) => task.status === "inProgress"
  ).length;
  document.getElementById("completedCount").textContent = tasks.filter(
    (task) => task.status === "completed"
  ).length;
}

function toggleMenu(menuId) {
  const menu = document.getElementById(menuId);
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function deleteTasks(status) {
  const container = document.getElementById(`${status}Tasks`);
  container.innerHTML = "";
  tasks = tasks.filter((task) => task.status !== status);
  updateCounts();
}

function openModal(status) {
  document.getElementById("taskDetailsModal").style.display = "block";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("status").value = status;
}

function saveTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const status = document.getElementById("status").value;

  if (title) {
    const task = { title, description, status };
    tasks.push(task);
    renderTask(task);
    updateCounts();
  }

  closeTaskDetailsModal();
}

function deleteTask() {
  const title = document.getElementById("title").value.trim();
  tasks = tasks.filter((task) => task.title !== title);
  updateCounts();
  closeTaskDetailsModal();
}

function cancelAddTask() {
  closeTaskDetailsModal();
}

function closeTaskDetailsModal() {
  document.getElementById("taskDetailsModal").style.display = "none";
}

function renderTask(task) {
  const container = document.getElementById(`${task.status}Tasks`);
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.textContent = task.title;
  taskElement.onclick = function () {
    openModal(task.status);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description || "";
  };
  container.appendChild(taskElement);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, status) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text/plain");
  const task = tasks.find((task) => task.title === taskId);
  if (task) {
    task.status = status;
    updateCounts();
    renderTask(task);
  }
}

function restoreTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => renderTask(task));
    updateCounts();
  }
}

window.onload = restoreTasks;
