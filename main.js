"use strict";
const taskForm = document.getElementById("todo-form");
const listTodo = document.getElementById("todo-list"); 
const inputTodo = document.getElementById("todo-input").value;

function todoFun(event) {
    event.preventDefault();
    
    const inputTodo = document.getElementById("todo-input").value;
    const li = document.createElement("li");
    li.innerHTML = ` <input type="checkbox"> ${inputTodo} ` ;
    listTodo.appendChild(li);
    
}

// const task = {
//     id: Date.now(),
//     text: inputTodo.value,
//     completed: false,
//     };

// const taskObjToString = JSON.stringify(task);
// const toJSONTask = JSON.parse(taskObjToString);

// taskForm.addEventListener("submit", addTask);




//     console.log(tasks.completed);


let tasksKey = JSON.parse(localStorage.getItem("tasks")) || [];
// what happens then tasks = []?
function renderTasks() {
    console.log("renderTasks()");
    listTodo.innerHTML = "";
 
    for (let i = 0; i < tasksKey.length; i++) {
      const oneTask = tasksKey[i];
      // i = 1
      //const task = {
      //   "id": 1673253281028,
      //   "text": "Do homework",
      //   "completed": false
      // }
      // after one toggle:
      //const task = {
      //   "id": 123,
      //   "text": "Do homework",
      //   "completed": false
      // }
      const li = document.createElement("li");
      // {task.completed ? "checked" : ""}
      // or {task.completed && "checked"}
      // when we click on the checkbox => toggleCompletion(123)
      // with the current task id (123)
      li.innerHTML = `
      <label>
      <input type="checkbox" onchange="toggleCompletion(${oneTask.id})" 
      ${oneTask.completed && "checked"} id="task-${oneTask.id}">
      ${oneTask.text}
      </label>
      <button type="button" id="delete-${oneTask.id}" 
          onclick="deleteTask(${oneTask.id})">Delete</button>
          `;
          
          li.className = oneTask.completed ? "completed" : "not-completed";
          // li.className = task.completed && "completed";
          listTodo.appendChild(li);
        }
    }


    function addTask(event) {
        event.preventDefault();
        const task = {
            id: Date.now(),
            text: inputTodo.value,
            completed: false,
        };
        
        tasksKey.push(task);
        localStorage.setItem("tasks", tasksKey );
        inputTodo.value = "";
            todoFun();
        }

        function toggleCompletion(id) {
            for (let i = 0; i < tasksKey.length; i++) {
              tasksKey[id]; // tasks[123] => id is not the index
              const currentTask = tasksKey[i];
              if (currentTask.id === id) {
                currentTask.completed = !currentTask.completed; // toggle to the checkbox
                //tasks[i].completed = true; // for onr toggle
              }
            }
            localStorage.setItem("tasks", JSON.stringify(tasksKey));
            renderTasks();
          }

    taskForm.addEventListener("submit", addTask);
    renderTasks();
