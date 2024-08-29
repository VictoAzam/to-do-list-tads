// Função para exibir as tarefas na tela
function displayTasks() {
    // Obtém o elemento HTML onde a lista de tarefas será exibida
    const todoList = document.getElementById('todo-list');
    // Limpa o conteúdo atual da lista de tarefas
    todoList.innerHTML = '';

    // Obtém as tarefas armazenadas no localStorage. Se não houver tarefas, usa um array vazio.
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Itera sobre cada tarefa na lista de tarefas
    tasks.forEach((task, index) => {
        // Cria um novo elemento 'div' para representar um card de tarefa
        const card = document.createElement('div');
        // Define a classe do card para controlar o layout com o Bootstrap
        card.className = 'col-md-4';

        // Define a classe do badge de prioridade com base na prioridade da tarefa
        let badgeClass;
        switch (task.priority) {
            case 'baixa':
                badgeClass = 'bg-success'; // Verde para baixa
                break;
            case 'media':
                badgeClass = 'bg-warning'; // Amarelo para média
                break;
            case 'alta':
                badgeClass = 'bg-danger'; // Vermelho para alta
                break;
            default:
                badgeClass = ''; // Garantir que sempre tenha uma classe
        }

        // Adiciona o conteúdo HTML ao card, incluindo título da tarefa, badge de prioridade e botões de ação
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

// Procurar tarfas:
const searchBar = document.getElementById("search-task")

if (searchBar) {
    searchBar.addEventListener("keyup", (e) => {
        const search = e.target.value.toLowerCase()

        document.querySelectorAll(".card").forEach((card) => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            const priority = card.querySelector(".badge").innerText.toLowerCase();

            if (title.includes(search) || priority.includes(search)) {
                card.parentElement.style.display = "block";
            } else {
                card.parentElement.style.display = "none";
            }
        });
    });
}


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


window.onload = function() {
    displayTasks();
};
