// Função para exibir as tarefas na tela
function displayTasks() {
    // Vai obter o elemento HTML onde a lista de tarefas será exibida
    const todoList = document.getElementById('todo-list');
    // Limpa o conteúdo atual da lista de tarefas
    todoList.innerHTML = '';

    // Obtém as tarefas armazenadas no localStorage. Se não houver tarefas, usa um array vazio.
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Itera sobre cada tarefa na lista de tarefas
    tasks.forEach((task, index) => {
        // Cria um novo elemento 'div' para representar um card de tarefa
        const card = document.createElement('div');
        // Define a classe do card para controlar o layout com  o tal do Bootstrap
        card.className = 'col-md-4';

        // Define a classe do badge de prioridade com base na prioridade da tarefa
        let badgeClass;
        switch (task.priority) {
            case 'baixa':
                badgeClass = 'bg-success'; // Verde para  baixa
                break;
            case 'media':
                badgeClass = 'bg-warning'; // Amarelo para  média
                break;
            case 'alta':
                badgeClass = 'bg-danger'; // Vermelho para alta
                break;
        }

        // Adiciona o conteúdo no HTML ao card, incluindo título da tarefa, badge de prioridade e botões de ação
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

        // Adiciona o card ao elemento da lista de tarefas
        todoList.appendChild(card);

        // Adiciona um listener de evento para o botão de deletar a tarefa
        card.querySelector('.delete-task').addEventListener('click', function () {
            // Remove a tarefa do array
            tasks.splice(index, 1);
            // Atualiza o localStorage com a lista de tarefas atualizada
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // Reexibe a lista de tarefas atualizada
            displayTasks();
        });

        // Adiciona um listener de evento para o botão de marcar/desmarcar a tarefa como concluída
        card.querySelector('.check-task').addEventListener('click', function () {
            // Alterna o status de concluída da tarefa
            task.completed = !task.completed;
            // Atualiza o localStorage com a lista de tarefas atualizada
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // Reexibe a lista de tarefas atualizada
            displayTasks();
        });

        // Adiciona um listener de evento para o botão de editar a tarefa
        card.querySelector('.edit-task').addEventListener('click', function () {
            // Solicita ao usuário um novo texto para a tarefa
            const newTaskText = prompt('Edite sua tarefa:', task.text);
            // Se o novo texto for válido (não nulo e não vazio)
            if (newTaskText !== null && newTaskText.trim() !== '') {
                // Atualiza o texto da tarefa
                task.text = newTaskText;
                // Atualiza o localStorage com a lista de tarefas atualizada
                localStorage.setItem("tasks", JSON.stringify(tasks));
                // Reexibe a lista de tarefas atualizada
                displayTasks();
            }
        });
    });
}

// Inicializa a lista de tarefas ao carregar a página
window.onload = function() {
    displayTasks();
};
