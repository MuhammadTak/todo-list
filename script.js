const newTaskInput = document.querySelector('.newtask-input');
const newTaskAddButton = document.querySelector('.newtask-add');
const tasksContainer = document.querySelector('.tasks');

function addTask() {
    if (newTaskInput.value.length === 0) {
        alert('first enter a task');
        return;
    }

    else {

        if (tasksContainer.children.length == 0) {
            tasksContainer.style.display = 'block';
            tasksContainer.classList.remove('removing');
        }

        tasksContainer.innerHTML += `
            <div class="task">
                <span class="task-name">${newTaskInput.value}</span>
                <img class="deleteButton" src="images/remove.png" alt="remove task">
            </div>
        `;


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
    if (event.target.classList.contains('deleteButton')) { // обработчик событий для кнопки удаления задачи
        const taskDiv = event.target.closest('.task');

        taskDiv.classList.add('removing');

        taskDiv.addEventListener('transitionend', () => {
            taskDiv.remove();

            if (tasksContainer.children.length == 0) {
                tasksContainer.classList.add('removing');

                tasksContainer.addEventListener('transitioned', () => {
                    tasksContainer.style.display = 'none';
                })
            }
        }, { once: true });

    }

    if (event.target.classList.contains('task-name')) { // обработчик событий для task-name строки
        event.target.classList.toggle('completed');
    }

})

