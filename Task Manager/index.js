// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-button');

// Event listener for "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Event listener for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', filterTasks);
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'task-item', 'pending');

    taskItem.innerHTML = `
        <p class="task-title">${taskText}</p>
        <div class="task-buttons">
            <button class="btn-done btn btn-success btn-sm">Done</button>
            <button class="btn-edit btn btn-warning btn-sm">Edit</button>
            <button class="btn-delete btn btn-danger btn-sm">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';

    // Event listeners for task buttons
    const doneButton = taskItem.querySelector('.btn-done');
    const editButton = taskItem.querySelector('.btn-edit');
    const deleteButton = taskItem.querySelector('.btn-delete');

    doneButton.addEventListener('click', markAsDone);
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
}

// Function to mark a task as done
function markAsDone(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.classList.toggle('completed');

    if (taskItem.classList.contains('completed')) {
        taskItem.classList.remove('pending');
    } else {
        taskItem.classList.add('pending');
    }
}

// Function to edit a task
function editTask(event) {
    const taskItem = event.target.closest('.task-item');
    const taskTitle = taskItem.querySelector('.task-title');
    const newTask = prompt('Edit Task:', taskTitle.textContent);

    if (newTask) {
        taskTitle.textContent = newTask;
    }
}

// Function to delete a task
function deleteTask(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.remove();
}

// Function to filter tasks
function filterTasks(event) {
    const filterType = event.target.getAttribute('data-filter');
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
        if (filterType === 'all') {
            task.style.display = 'flex';
        } else if (filterType === 'completed' && task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else if (filterType === 'pending' && task.classList.contains('pending')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}
