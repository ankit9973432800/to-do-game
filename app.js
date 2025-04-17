let addButton = document.querySelector("#add-btn");
let input = document.querySelector("#task-input");
let ul = document.querySelector("#task-list");
let themeButton = document.querySelector("#theme-toggle");

addButton.addEventListener("click", function() {
    if (input.value.trim() !== "") {
        let taskText = input.value.trim();
        let time = new Date().toLocaleString();

        // Create task item
        let item = document.createElement("li");
        let taskSpan = document.createElement("span");
        taskSpan.innerText = taskText;
        
        let taskTime = document.createElement("span");
        taskTime.classList.add("task-time");
        taskTime.innerText = `Added at: ${time}`;
        
        let delBtn = document.createElement("button");
        delBtn.innerText = "delete";
        delBtn.classList.add("delete");
        
        // Add task and delete button to the list
        item.appendChild(taskSpan);
        item.appendChild(taskTime);
        item.appendChild(delBtn);
        ul.appendChild(item);

        // Clear input field
        input.value = "";

        // Save tasks to local storage
        saveToLocalStorage();
    }
});

ul.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete")) {
        let taskItem = event.target.parentElement;
        taskItem.remove();
        saveToLocalStorage();
    }
});

// Save tasks to local storage
function saveToLocalStorage() {
    let tasks = [];
    document.querySelectorAll("li").forEach(function(task) {
        let taskText = task.querySelector("span").innerText;
        let taskTime = task.querySelector(".task-time").innerText.replace("Added at: ", "");
        tasks.push({ text: taskText, time: taskTime });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadFromLocalStorage() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach(function(task) {
            let item = document.createElement("li");
            let taskSpan = document.createElement("span");
            taskSpan.innerText = task.text;
            
            let taskTime = document.createElement("span");
            taskTime.classList.add("task-time");
            taskTime.innerText = `Added at: ${task.time}`;
            
            let delBtn = document.createElement("button");
            delBtn.innerText = "delete";
            delBtn.classList.add("delete");

            item.appendChild(taskSpan);
            item.appendChild(taskTime);
            item.appendChild(delBtn);
            ul.appendChild(item);
        });
    }
}

// Toggle dark mode
themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Load tasks from local storage when page loads
window.onload = loadFromLocalStorage;
