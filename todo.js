// IFEE module design pattern
(function () {
  let tasks = [];
  const taskList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");

  console.log("Working");

  async function fetchToDos() {
    // GET request
    // fetch("https://jsonplaceholder.typicode.com/todos")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   const random_num = Math.floor(Math.random() * 100 + 1);
    //   tasks = data.slice(random_num, random_num + 10);
    //   renderList();
    // })
    // .catch(function (error) {
    //   console.log("Error is:", error);
    // });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      const random_num = Math.floor(Math.random() * 100 + 1);
      tasks = data.slice(random_num, random_num + 10);
      renderList();
    } catch (error) {
      console.log(error);
    }
  }

  function addTaskToDOM(task) {
    // Used to create elements dynamically!
    const li = document.createElement("li");

    // ${} - it's value is decided on runtime.
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    } class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="images/bin2.svg" class="delete" data-id="${task.id}" />
    `;

    taskList.append(li);
  }

  function renderList() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
  }

  function markTaskAsComplete(taskId) {
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });
    if (task.length > 0) {
      const curr_task = task[0];

      curr_task.completed = !curr_task.completed;
      renderList();
      showNotification("Task toggled successfully!");
    } else {
      showNotification("Could not toggle the task!");
    }
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id != taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted Successfully!");
  }

  function addTask(task) {
    if (task) {
      // POST request
      // fetch('https://jsonplaceholder.typicode.com/todos', {
      //   method: "POST", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      // .then(function (response) {
      //   return response.json();
      // })
      // .then(function (data) {
      //   const random_num = Math.floor(Math.random() * 100 + 1);
      //   tasks = data.slice(random_num, random_num + 10);
      //   renderList();
      //   tasks.push(task);
      //   renderList();
      //   showNotification("Task added successfully!");
      // })
      // .catch(function (error) {
      //   console.log("Error is:", error);
      // });
      tasks.push(task);
      renderList();
      showNotification("Task added successfully!");
    } else {
      showNotification("Task cannot be added!");
    }
  }

  function showNotification(text) {
    alert(text);
  }

  function handleInputKeyPress(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      console.log("text is: ", text);
      if (!text) {
        showNotification("Task text cannot be empty!");
        return;
      }
      const task = {
        userId: 1,
        title: text,
        completed: false,
        id: Date.now().toString(),
      };
      event.target.value = "";
      addTask(task);
    }
  }

  function handleClickListener(event) {
    const target = event.target;
    console.log(target);

    // Event delegation implemented below.
    if (target.className === "delete") {
      // dataset - used to get the data-id from the html.
      const taskId = target.dataset.id;
      deleteTask(taskId);
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      markTaskAsComplete(taskId);
    }
  }

  // IIFE
  (function initializeApp() {
    fetchToDos();
    addTaskInput.addEventListener("keyup", handleInputKeyPress);
    // Event Delegation - we are letting the event.target decide in the event
    //                  callback function that which element is clicked without
    //                  creating addEventListener's for many elements.
    document.addEventListener("click", handleClickListener);
  })();
})();
