document.addEventListener('DOMContentLoaded', () => {
    const taskContent = document.getElementById('task-content');
    const completeTaskBtn = document.getElementById('complete-task');
    const taskList = document.getElementById('task-list');
    const resetTaskBtn = document.getElementById('reset-tasks');

    const tasks = [
        "Introduce yourself to someone new today.",
        "Research a company you're interested in.",
        "Practice answering a common interview question.",
        "Write a short bio about yourself.",
        "List three job skills you'd like to improve."
    ];

    let currentTask = getDailyTask();
    taskContent.textContent = currentTask;

    function getDailyTask() {
        const today = new Date().toLocaleDateString();
        const savedTask = localStorage.getItem('currentTask');
        const savedDate = localStorage.getItem('taskDate');

        if (savedDate === today && savedTask) {
            return savedTask;
        } else {
            const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
            const availableTasks = tasks.filter(task => !completedTasks.some(item => item.task === task));

            if (availableTasks.length === 0) {
                localStorage.setItem('completedTasks', JSON.stringify([]));
                return "All tasks completed! Reset to start over.";
            }

            const newTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
            localStorage.setItem('currentTask', newTask);
            localStorage.setItem('taskDate', today);
            return newTask;
        }
    }

    completeTaskBtn.addEventListener('click', () => {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        const today = new Date().toLocaleDateString();

        if (!completedTasks.some(item => item.task === currentTask)) {
            completedTasks.push({ task: currentTask, date: today });
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            renderProgress();
        }
    });

    resetTaskBtn.addEventListener('click', () => {
        localStorage.removeItem('completedTasks');
        localStorage.removeItem('currentTask');
        localStorage.removeItem('taskDate');
        taskContent.textContent = getDailyTask();
        renderProgress();
    });

    function renderProgress() {
        taskList.innerHTML = '';
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        
        completedTasks.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.task} - Completed on ${item.date}`;
            taskList.appendChild(li);
        });
    }

    renderProgress();
});
