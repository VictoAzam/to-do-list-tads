document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const todoList = document.getElementById('todo-list');

    const task = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (task !== '') {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        let badgeClass;
        switch (priority) {
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

        card.innerHTML = `
        <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">${task}</h5>
            <span class="badge ${badgeClass}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
            <button class="btn btn-success btn-sm float-right check-task"><i class='bx bx-check'></i></button>
            <button class="btn btn-danger btn-sm float-right delete-task mr-2"><i class='bx bx-trash'></i></button>
            <button class="btn btn-info btn-sm float-right edit-task mr-2"><i class='bx bx-edit'></i></button>
        </div>
        </div>
    `;

        todoList.appendChild(card);

        // Limpa o campo de entrada
        todoInput.value = '';

        // Adiciona funcionalidade de remoção de tarefas
        card.querySelector('.delete-task').addEventListener('click', function () {
            todoList.removeChild(card);
        });

        // Adiciona funcionalidade de marcar tarefa como concluída
        card.querySelector('.check-task').addEventListener('click', function () {
            const taskTitle = card.querySelector('.card-title');
            taskTitle.style.textDecoration = 'line-through';
            taskTitle.style.color = '#6c757d'; // Texto cinza claro para indicar tarefa concluída
            card.querySelector('.check-task').disabled = true; // Desabilitar o botão de check após a tarefa ser concluída
        });

        // Adiciona funcionalidade de edição de tarefas
        card.querySelector('.edit-task').addEventListener('click', function () {
            const taskTitle = card.querySelector('.card-title');
            const newTask = prompt('Edite sua tarefa:', taskTitle.textContent);

            if (newTask !== null && newTask.trim() !== '') {
                taskTitle.textContent = newTask;
                card.classList.add('edited'); // Adiciona a classe para indicar que a tarefa foi editada
            }
        });
    }
});
