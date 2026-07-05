const newTaskInput = document.querySelector('.newtask-input');
const newTaskAddButton = document.querySelector('.newtask-add');
const tasksContainer = document.querySelector('.tasks');

function addTask() {
    if (newTaskInput.value.length === 0) {
        alert('first enter a task');
        return;
    }

    else {
        tasksContainer.innerHTML += `
            <div class="task">
                <span class="task-name">${newTaskInput.value}</span>
                <img class="deleteButton" src="images/remove.png" alt="remove task">
            </div>
        `;

        tasksContainer.style.backgroundColor = '#eee';
        newTaskInput.value = '';
    }

}

// Вешаем обработчики событий для добавления задачи

newTaskAddButton.addEventListener('click', () => {
    addTask();
})


document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
})

//  Делегируем обработчик событий

tasksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const taskDiv = event.target.closest('.task');

        taskDiv.classList.add('removing');

        taskDiv.addEventListener('transitionend', () => {
            taskDiv.remove();

            if (tasksContainer.children.length == 0) {
                tasksContainer.style.backgroundColor = 'transparent';
            }
        }, { once: true });

    }

    if (event.target.classList.contains('task-name')) {
        event.target.classList.toggle('completed');
    }

})

