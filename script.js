// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorDiv = document.getElementById('error');

// Create an array to store tasks
let tasks = [];

// Function to render tasks in the list
function renderTasks() {
  // Clear the task list
  taskList.innerHTML = '';
                              
  // Render each task
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task}</span>
      <button class="editTaskBtn" data-index="${index}">Edit</button>
      <button class="deleteTaskBtn" data-index="${index}">Delete</button>
    `;

    taskList.appendChild(taskItem);
  });

  // Attach event listeners to edit and delete buttons
  const editButtons = document.getElementsByClassName('editTaskBtn');
  const deleteButtons = document.getElementsByClassName('deleteTaskBtn');

  Array.from(editButtons).forEach((button) => {
    button.addEventListener('click', handleEditTask);
  });

  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', handleDeleteTask);
  });
}

// Function to handle adding a new task
function handleAddTask() {
  const taskText = taskInput.value.trim();

  // Check for empty task
  if (taskText === '') {
    errorDiv.innerText = 'Please enter a task.';
    errorDiv.style.display = 'block';
    return;
  }

  // Clear error message
  errorDiv.innerText = '';
  errorDiv.style.display = 'none';

  // Add task to the array
  tasks.push(taskText);

  // Clear the input field
  taskInput.value = '';

  // Render the updated task list
  renderTasks();
}

// Function to handle editing a task
function handleEditTask(event) {
  const index = event.target.dataset.index;
  const newTaskText = prompt('Enter the new task text:');
  if (newTaskText !== null) {
    tasks[index] = newTaskText.trim();
    renderTasks();
  }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  const index = event.target.dataset.index;
  tasks.splice(index, 1);
  renderTasks();
}

// Attach event listeners
addTaskBtn.addEventListener('click', handleAddTask);
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleAddTask();
  }
});