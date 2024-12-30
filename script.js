var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function addToDoItem() {
    var itemText = toDoEntryBox.value.trim();
    if (itemText === "") {
        alert("Please enter a task!");
        return;
    }
    newToDoItem(itemText, false);
    toDoEntryBox.value = ""; // Reset input box
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    var completedItems = Array.from(toDoList.getElementsByClassName("completed"));

    completedItems.forEach(function(item) {
        item.remove();
    });
}

function emptyList() {
    toDoList.innerHTML = "";
}

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed"),
        };

        toDos.push(toDoInfo);
    }

    if (toDos.length === 0) {
        alert("No tasks to save!");
        return;
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    alert("Tasks saved successfully!");
}

function loadList() {
    var savedToDos = localStorage.getItem("toDos");

    if (savedToDos) {
        var toDos = JSON.parse(savedToDos);

        toDos.forEach(function(toDo) {
            newToDoItem(toDo.task, toDo.completed);
        });
    } else {
        console.log("No tasks found in localStorage.");
    }
}

loadList();
