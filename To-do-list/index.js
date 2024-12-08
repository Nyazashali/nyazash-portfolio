// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task to the list
function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    const priority = document.getElementById("priority-select").value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("task-list");

    // Create a new list item
    const newTask = document.createElement("li");
    newTask.classList.add(priority.toLowerCase()); // Add priority class to task

    // Create text node for task
    const taskNode = document.createTextNode(taskText);
    newTask.appendChild(taskNode);

    // Create the "Complete" button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.onclick = () => {
        newTask.classList.toggle("completed");
        saveTasks();
    };

    // Create the "Delete" button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        newTask.remove();
        saveTasks();
    };

    // Create the "Edit" button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(newTask, taskText);

    // Append buttons to the task item
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    // Append the new task to the task list
    taskList.appendChild(newTask);

    // Save tasks to localStorage
    saveTasks();

    // Clear the input field
    input.value = "";
}

// Edit an existing task
function editTask(taskElement, oldText) {
    const newText = prompt("Edit your task:", oldText);
    if (newText !== null && newText.trim() !== "") {
        taskElement.firstChild.nodeValue = newText.trim(); // Change the text
        saveTasks();
    }
}

// Clear all tasks
function clearAllTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear the task list
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById("task-list");
    const tasks = [];
    
    taskList.querySelectorAll("li").forEach(task => {
        const taskData = {
            text: task.firstChild.nodeValue,
            completed: task.classList.contains("completed"),
            priority: task.classList[0]
        };
        tasks.push(taskData);
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(taskData => {
            const newTask = document.createElement("li");
            newTask.classList.add(taskData.priority);
            if (taskData.completed) newTask.classList.add("completed");

            const taskNode = document.createTextNode(taskData.text);
            newTask.appendChild(taskNode);

            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.onclick = () => {
                newTask.classList.toggle("completed");
                saveTasks();
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editTask(newTask, taskData.text);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => {
                newTask.remove();
                saveTasks();
            };

            newTask.appendChild(completeButton);
            newTask.appendChild(editButton);
            newTask.appendChild(deleteButton);

            const taskList = document.getElementById("task-list");
            taskList.appendChild(newTask);
        });
    }
}