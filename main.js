let task = document.getElementById("task");
let addBtn = document.getElementById("add");
let tbody = document.getElementById("tbody");
let Update = document.getElementById("Update");
let Delete = document.getElementById("Delete");
let mood = "create";
let done = document.getElementsByName("done");

let tmp;

// create array
let tasksArr;

if (localStorage.tasks != null) {
    tasksArr = JSON.parse(localStorage.tasks);
} else {
    tasksArr = [];
}

addBtn.onclick = function () {
    if (task.value !== null) {
        let newTask = {
            title: task.value,
            complete: false,
        };

        if (mood === "create") {
            tasksArr.push(newTask);
        } else {
            tasksArr[tmp] = newTask;
            mood = 'create';
            addBtn.innerHTML = 'create';
        }

        localStorage.setItem('tasks', JSON.stringify(tasksArr));
        clearData();
        show();
    }
};

// clear
function clearData() {
    task.value = '';
}

function taskDone(i) {
    tasksArr[i].complete = done[i].checked;
    localStorage.setItem('tasks', JSON.stringify(tasksArr));
    show();
}

// show
function show() {
    let table = '';

    for (let i = 0; i < tasksArr.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${tasksArr[i].title}</td>
        <td><button onclick="updateTask(${i})" id="Update">Update</button></td>
        <td><button onclick="deleteTask(${i})" id="Delete">Delete</button></td>
        <td>
        <input onclick="taskDone(${i})" type="checkbox" name="done" ${tasksArr[i].complete ? 'checked' : ''}>
        </td>
        </tr>
    `;
    }

    tbody.innerHTML = table;
}

show();

function deleteTask(i) {
    tasksArr.splice(i, 1);
    localStorage.tasks = JSON.stringify(tasksArr);
    show();
}

function updateTask(i) {
    task.value = tasksArr[i].title;
    addBtn.innerHTML = 'Update';
    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth',
    });
}