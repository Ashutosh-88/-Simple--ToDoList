const inputText = document.querySelector("#input-text");
const btnAdd = document.querySelector(".btn-submit");
const listTask = document.querySelector("#content-list");
const spanFooter = document.querySelector(".footer-span");
const mainDiv = document.querySelector("#main-div");

listTask.textContent = "";
let todoData = [];

// set data in local storage
const setTaskInLS = function (task) {
  return localStorage.setItem("taskData", JSON.stringify(task).toLowerCase());
};

// get data from local storage
const getTaskFromLS = function () {
  return JSON.parse(localStorage.getItem("taskData")) || [];
};

// Display task with simple validation
const displayTasks = function (task) {
  const textContents = `<li class = "listedTask">${task
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}<button class="btn btn-delete">❌</button></li>`;

  // Simple Validation
  if (task.length !== 0) {
    listTask.insertAdjacentHTML("beforeend", textContents);
  }
};

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();

  todoData = getTaskFromLS();
  let newTask = inputText.value.trim().toLowerCase();

  if (newTask.length !== 0 && !todoData.includes(newTask)) {
    todoData.push(newTask);

    setTaskInLS(todoData);

    // Display Tasks
    displayTasks(newTask);
  }
  // Clears input field
  inputText.value = "";
});

listTask.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    const textOnly = e.target.parentElement.textContent
      .trim()
      .toLowerCase()
      .replace("❌", "");

    const updatedTodoData = todoData.filter(
      (currData) => currData !== textOnly
    );
    todoData = updatedTodoData;
    setTaskInLS(todoData);
    e.target.parentElement.remove();
  }
});

// Show task from Local Storage
const showTaskFromLS = () => {
  todoData = getTaskFromLS();
  todoData.forEach((currTask) => {
    // Display Tasks
    displayTasks(currTask);
  });
};

// Loads This todo data after refresh
showTaskFromLS();

// css manipulation
let colorInterval;

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

const customCssAnimation = function () {
  const root = document.documentElement;

  colorInterval = setInterval(() => {
    root.style.setProperty("--color-changer", randomColor());
    root.style.setProperty("--color-changer", randomColor());
  }, 500);
};

const stopColorAnimation = function () {
  // Stop the color-changing interval when mouse leaves
  clearInterval(colorInterval);
};

// Attach the event listener to the span element
mainDiv.addEventListener("mouseover", customCssAnimation);
mainDiv.addEventListener("mouseout", stopColorAnimation);
spanFooter.addEventListener("mouseover", customCssAnimation);
spanFooter.addEventListener("mouseout", stopColorAnimation);
