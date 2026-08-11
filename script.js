const addTaskInput = document.querySelector('.newtask-input');
const addTaskButton = document.querySelector('.newtask-add');

const tasksContainer = document.querySelector('.tasks');

const clearAllContainer = document.querySelector('.clear-all_container');
const clearAll = document.querySelector('.clear-all');

const noTasksContainer = document.querySelector('.no-tasks_container');


function addTask() {
  const value = addTaskInput.value.trim();
  if (!value) {
    alert('first enter a task');
    return;
  }

  else {

    if (tasksContainer.children.length == 0) {
      tasksContainer.classList.remove('removing');
      tasksContainer.style.display = 'block';

      clearAllContainer.classList.remove('removing');
      clearAllContainer.style.display = "block";

      noTasksContainer.style.display = 'none';
    }

    tasksContainer.insertAdjacentHTML('beforeend', `
      <div class="task">
        <div class="checkbox-container">
          <input class="task-checkbox" type="checkbox" id="checkbox${tasksContainer.children.length}">
          <label class="task-label" for="checkbox${tasksContainer.children.length}">${addTaskInput.value}</label>
        </div>
        <img class="task-deleteButton" src="images/icons/remove.png" alt="remove task">
      </div>
    `);


    addTaskInput.value = '';
  }

}

// Вешаем обработчики событий для добавления задачи
// через кнопку в интерфейсе, и через enter

addTaskButton.addEventListener('click', () => {
  addTask();
})

addTaskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTask();
})

// Делегируем обработчик событий для кнопки удаления задачи

tasksContainer.addEventListener('click', (event) => {

  if (event.target.classList.contains('task-deleteButton')) {
    const currentTask = event.target.closest('.task');

    currentTask.classList.add('removing');
    currentTask.addEventListener('transitionend', function onTaskTransitionEnd(event) {
      if (event.target !== currentTask) return;
      currentTask.removeEventListener('transitionend', onTaskTransitionEnd);

      currentTask.remove();

      if (tasksContainer.children.length === 0) {
        tasksContainer.classList.add('removing');
        clearAllContainer.classList.add('removing');

        tasksContainer.addEventListener('transitionend', function onContainerTransitionEnd(e) {
          if (e.target !== tasksContainer) return;
          tasksContainer.removeEventListener('transitionend', onContainerTransitionEnd);

          tasksContainer.style.display = 'none';
          clearAllContainer.style.display = 'none';
          noTasksContainer.style.display = 'flex';
        });
      }
    });
  }

});

// Эмулируем клик по чекбоксу при нажатии на таску

tasksContainer.addEventListener('click', (event) => {
  const currentTask = event.target.closest('.task');
  if (!currentTask) return;

  if (event.target === currentTask) {
    const checkbox = currentTask.querySelector('.task-checkbox');
    checkbox.click();
  }
});

// Делегируем обработчик событий для чекбокса, на его изменение

tasksContainer.addEventListener('change', (event) => {
  if (!event.target.classList.contains('task-checkbox')) return;

  const currentTask = event.target.closest('.task');
  const taskLabel = currentTask.querySelector('.task-label');

  taskLabel.classList.toggle('completed', event.target.checked);
})


// Обработчик событий для кнопки clearAll

clearAll.addEventListener('click', () => {
  const currentTasks = [...tasksContainer.children];

  for (const task of currentTasks) {
    task.classList.add('removing');
  }
  clearAllContainer.classList.add('removing');

  const firstTask = currentTasks[0];
  firstTask.addEventListener('transitionend', function onTaskTransitionEnd(event) {
    if (event.target !== firstTask) return;
    firstTask.removeEventListener('transitionend', onTaskTransitionEnd);

    currentTasks.forEach(task => task.remove());
    clearAllContainer.style.display = 'none';
    // 
    tasksContainer.classList.add('removing');
    tasksContainer.addEventListener('transitionend', function onTasksContainerTransitionEnd(event) {
      if (event.target !== tasksContainer) return;

      tasksContainer.removeEventListener('transitionend', onTasksContainerTransitionEnd);
      tasksContainer.style.display = 'none';
      noTasksContainer.style.display = 'flex';
    });

  })

});

