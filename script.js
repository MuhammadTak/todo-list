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

        tasksContainer.insertAdjacentHTML('beforeend', `
            <div class="task">
                <span class="task-name">${newTaskInput.value}</span>
                <img class="deleteButton" src="images/remove.png" alt="remove task">
            </div>
        `);


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
        taskDiv.addEventListener('transitionend', onTaskTransitionEnd);

        function onTaskTransitionEnd(event) {
            if (event.target !== taskDiv) return;
            taskDiv.removeEventListener('transitionend', onTaskTransitionEnd);

            taskDiv.remove();

            if (tasksContainer.children.length == 0) {
                tasksContainer.classList.add('removing');
                tasksContainer.addEventListener('transitionend', onContainerTransitionEnd);

                function onContainerTransitionEnd(e) {
                    if (e.target !== tasksContainer) return;

                    tasksContainer.removeEventListener('transitionend', onContainerTransitionEnd);
                    tasksContainer.style.display = 'none';
                }
            }
        }
    }

    if (event.target.classList.contains('task-name')) {
        event.target.classList.toggle('completed');
    }
});

