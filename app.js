let button = document.querySelector("button");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let themeToggle = document.getElementById("theme-toggle");

// Load saved tasks from local storage when the page loads
window.addEventListener("load", function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(function(taskData) {
            createTask(taskData.text, taskData.completed, taskData.time);
        });
    }
});

// Toggle dark mode
themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    themeToggle.classList.toggle("dark-mode");
});

// Add task to the list on button click
button.addEventListener("click", function() {
    let taskText = input.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    let currentTime = new Date().toLocaleTimeString();
    createTask(taskText, false, currentTime);
    saveToLocalStorage();
    input.value = ""; // Clear input field
});

// Add task to the list on pressing Enter key
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let taskText = input.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        let currentTime = new Date().toLocaleTimeString();
        createTask(taskText, false, currentTime);
        saveToLocalStorage();
        input.value = ""; // Clear input field
    }
});

// Create task element
function createTask(text, completed, time) {
    let item = document.createElement("li");
    if (completed) item.classList.add("completed");

    let span = document.createElement("span");
    span.innerText = text;

    let timeSpan = document.createElement("span");
    timeSpan.classList.add("task-time");
    timeSpan.innerText = `Added at: ${time}`;

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = completed;

    // Event listener for checkbox to mark task as completed
    checkBox.addEventListener("change", function() {
        if (checkBox.checked) {
            item.classList.add("completed");
        } else {
            item.classList.remove("completed");
        }
        saveToLocalStorage();
    });

    // Event listener for delete button to remove task
    delBtn.addEventListener("click", function() {
        item.remove();
        saveToLocalStorage();
    });

    item.appendChild(checkBox);
    item.appendChild(span);
    item.appendChild(timeSpan);
    item.appendChild(delBtn);
    ul.appendChild(item);
}

// Save tasks to local storage
function saveToLocalStorage() {
    let tasks = [];
    document.querySelectorAll("li").forEach(function(task) {
        let taskText = task.querySelector("span").innerText;
        let taskTime = task.querySelector(".task-time").innerText.replace("Added at: ", "");
        let completed = task.classList.contains("completed");
        tasks.push({ text: taskText, completed: completed, time: taskTime });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showMainPage() {
    document.getElementById('landingPage').style.display = 'none';  // Hide landing page
    document.getElementById('mainContent').style.display = 'block'; // Show main content
}