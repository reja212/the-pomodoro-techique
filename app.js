let studyTime = 0;
let breakTime = 0;
let isStudyTime = true;
let timerInterval;

const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');
const studyTimeInput = document.getElementById('study-time');
const breakTimeInput = document.getElementById('break-time');

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoItemsList = document.getElementById('todo-items');

const animatedText = document.getElementById('animated-text');
const phrases = ["Ciptakan Makna", "Pahami Diri", "Hadapi Tantangan", "Jalani Hidup", "Terima Kenyataan"];
let currentPhraseIndex = 0;

// Timer functionality
function startTimer() {
  if (!studyTime || !breakTime) {
    alert('Please set both study and break times!');
    return;
  }

  let timeRemaining = isStudyTime ? studyTime * 60 : breakTime * 60;
  
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      isStudyTime = !isStudyTime; // Toggle between study and break
      alert(isStudyTime ? 'Time to study!' : 'Time for a break!');
      startTimer(); // Restart the timer with the new mode
    }
    
    timeRemaining--;
  }, 1000);
}

startBtn.addEventListener('click', () => {
  studyTime = parseInt(studyTimeInput.value) || 0;
  breakTime = parseInt(breakTimeInput.value) || 0;
  startTimer();
});

// Reset Timer functionality
function resetTimer() {
  clearInterval(timerInterval); // Stop the current timer
  timerDisplay.textContent = "00:00"; // Reset display
  isStudyTime = true; // Set to study time by default
  studyTime = parseInt(studyTimeInput.value) || 0; // Use the user input for reset
  breakTime = parseInt(breakTimeInput.value) || 0; // Use the user input for reset
}

resetBtn.addEventListener('click', resetTimer);

// To-Do List functionality
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoItemsList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${todo.text} <button onclick="deleteTodo(${index})">Delete</button>`;
    li.style.textDecoration = todo.completed ? 'line-through' : 'none';
    li.addEventListener('click', () => toggleComplete(index));
    todoItemsList.appendChild(li);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    loadTodos();
  } else {
    alert('Please enter a task!');
  }
}

function toggleComplete(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

addTodoBtn.addEventListener('click', addTodo);
loadTodos();

// Change animated text every 5 seconds
setInterval(() => {
  currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
  animatedText.textContent = phrases[currentPhraseIndex];
}, 5000);
