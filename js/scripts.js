document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const todoList = document.getElementById('todo-list');

    const taskText = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText !== '') {
        // Carrega as tarefas do localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const task = {
            text: taskText,
            priority: priority,
            completed: false
        };

        tasks.push(task);

        // Salva no localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Limpa o campo de entrada
        todoInput.value = '';

        // Atualiza a exibição das tarefas
        displayTasks();
    }
});

// Função para exibir as tarefas na tela
function displayTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Limpa a lista atual

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        let badgeClass;
        switch (task.priority) {
            case 'baixa':
                badgeClass = 'badge-success';
                break;
            case 'media':
                badgeClass = 'badge-warning';
                break;
            case 'alta':
                badgeClass = 'badge-danger';
                break;
        }

        //card que é exibido qnd cria uma nova task
        card.innerHTML = `
        <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title ${task.completed ? 'completed' : ''}">${task.text}</h5>
            <span class="badge ${badgeClass}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            <button class="btn btn-success btn-sm float-right check-task"><i class='bx bx-check'></i></button>
            <button class="btn btn-danger btn-sm float-right delete-task mr-2"><i class='bx bx-trash'></i></button>
            <button class="btn btn-info btn-sm float-right edit-task mr-2"><i class='bx bx-edit'></i></button>
        </div>
        </div>
    `;

        todoList.appendChild(card);

        // Função para remover a tarefa
        card.querySelector('.delete-task').addEventListener('click', function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks(); // Reexibe a lista de tarefas atualizada
        });

        // Função para marcar tarefa como concluída
        card.querySelector('.check-task').addEventListener('click', function () {
            task.completed = true;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks(); // Reexibe a lista de tarefas atualizada
        });

        // Função para editar a tarefa
        card.querySelector('.edit-task').addEventListener('click', function () {
            const newTaskText = prompt('Edite sua tarefa:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(); // Reexibe a lista de tarefas atualizada
            }
        });
    });
}

// Inicializa a lista de tarefas ao carregar a página
window.onload = function() {
    displayTasks();
};
