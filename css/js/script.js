const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');
const deleteAllBtn = document.getElementById('delete-all-btn');

let tasks = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === '' || date === '') {
    alert('Harap isi semua kolom!');
    return;
  }

  tasks.push({ task, date, done: false });
  renderTasks();
  form.reset();
});

deleteAllBtn.addEventListener('click', function () {
  if (confirm('Hapus semua tugas?')) {
    tasks = [];
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    return;
  }

  tasks.forEach((t, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${t.task}</td>
      <td>${t.date}</td>
      <td>${t.done ? 'Selesai' : 'Belum'}</td>
      <td>
        <button onclick="toggleTask(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Hapus</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
