function displayTasks() { // a função displayTask responsavel por exibir todas as tarefas armazenadas
  
    const todoList = document.getElementById('todo-list');

    todoList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];// vai obter as tarefas no local storage e as converte em json para um array de objetos

    tasks.forEach((task, index) => {// intera sobre cada iten no array
      
        const card = document.createElement('div');// cria uma div
       
        card.className = 'col-md-4';// define a classe do card ocupar 4 colunas

        let badgeClass;// lista de prioridades let pq os resultados pode variar
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
            default:
                badgeClass = ''; 
        }

  //manipulacao da dom para alterar o titulo, badge de prioridade, botoes de ação, ? -->  condicional  true or false
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


        todoList.appendChild(card); // adiciona card recem criado ao elemento da lista  na tarefas da paginas

      
        card.querySelector('.delete-task').addEventListener('click', function () { // ao clicar deleta a task

            tasks.splice(index, 1);
   
            localStorage.setItem("tasks", JSON.stringify(tasks));//transforma js para json

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

// Procurar tarfas:
const searchBar = document.getElementById("search-task")

if (searchBar) {
    searchBar.addEventListener("keyup", (e) => {
        const search = e.target.value.toLowerCase()

        document.querySelectorAll(".card").forEach((card) => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            const priority = card.querySelector(".badge").innerText.toLowerCase();

            if (title.includes(search) || priority.includes(search)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
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
    displayTasks(); // define uma funcao quando a pagina for recarregada
};
