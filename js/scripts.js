// Função para exibir as tarefas na tela
function displayTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        let badgeClass;
        switch (task.priority) {
            case 'baixa':
                badgeClass = 'bg-success';
                break;
            case 'media':
                badgeClass = 'bg-warning';
                break;
            case 'alta':
                badgeClass = 'bg-danger';
                break;
        }

        card.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title ${task.completed ? 'completed' : ''}">${task.text}</h5>
                <span class="badge ${badgeClass}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                <button class="btn btn-success btn-sm float-end check-task"><i class='bx bx-check'></i></button>
                <button class="btn btn-danger btn-sm float-end delete-task ms-2"><i class='bx bx-trash'></i></button>
                <button class="btn btn-info btn-sm float-end edit-task ms-2"><i class='bx bx-edit'></i></button>
            </div>
        </div>
        `;

        todoList.appendChild(card);

        card.querySelector('.delete-task').addEventListener('click', function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        card.querySelector('.check-task').addEventListener('click', function () {
            task.completed = !task.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        card.querySelector('.edit-task').addEventListener('click', function () {
            const newTaskText = prompt('Edite sua tarefa:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            }
        });
    });
}

// Adiciona nova tarefa ao clicar no botão de submit
document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');

    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;

    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.push({
            text: taskText,
            priority: taskPriority,
            completed: false
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
});

// Inicializa a lista de tarefas ao carregar a página
window.onload = function() {
    displayTasks();
};
