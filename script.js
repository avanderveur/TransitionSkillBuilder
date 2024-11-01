document.addEventListener('DOMContentLoaded', () => {
    const categoryDropdown = document.getElementById('category-dropdown');
    const taskList = document.getElementById('task-list');
    const resetTasksBtn = document.getElementById('reset-tasks');

    // Tasks grouped by categories
    const tasks = [
        { task: "Practice a 5-minute mindfulness meditation.", category: "Mental Health" },
        { task: "Take a deep-breathing exercise break.", category: "Mental Health" },
        { task: "Write a short description of your top skills for your resume.", category: "Career Transition" },
        { task: "Research networking events in your area.", category: "Career Transition" },
        { task: "Create a simple monthly budget plan.", category: "Financial Literacy" },
        { task: "Read about VA benefits you may qualify for.", category: "Financial Literacy" },
        { task: "Reach out to a friend or family member today.", category: "Social Reintegration" },
        { task: "Plan a social activity for the weekend.", category: "Social Reintegration" }
    ];

    // Load completed tasks from local storage
    function loadCompletedTasks() {
        return JSON.parse(localStorage.getItem('completedTasks')) || [];
    }

    // Save completed tasks to local storage
    function saveCompletedTasks(completedTasks) {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    // Display tasks based on the selected category with checkboxes
    function displayTasksByCategory(category) {
        taskList.innerHTML = ''; // Clear previous tasks
        const completedTasks = loadCompletedTasks();

        // Filter tasks that match the selected category
        const filteredTasks = tasks.filter(task => task.category === category);

        // Display the tasks in the list
        if (filteredTasks.length > 0) {
            filteredTasks.forEach(taskItem => {
                const li = document.createElement('li');

                // Checkbox for marking the task as complete
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = completedTasks.includes(taskItem.task);
                checkbox.addEventListener('change', () => markTaskAsComplete(taskItem.task, checkbox.checked));

                li.appendChild(checkbox);
                li.appendChild(document.createTextNode(taskItem.task));
                taskList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = "No tasks available for this category.";
            taskList.appendChild(li);
        }
    }

    // Mark or unmark a task as complete
    function markTaskAsComplete(task, isComplete) {
        let completedTasks = loadCompletedTasks();

        if (isComplete) {
            if (!completedTasks.includes(task)) {
                completedTasks.push(task); // Add task to completed list
            }
        } else {
            completedTasks = completedTasks.filter(t => t !== task); // Remove task from completed list
        }

        saveCompletedTasks(completedTasks); // Save updated list to local storage
    }

    // Event listener for dropdown selection
    categoryDropdown.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory) {
            displayTasksByCategory(selectedCategory);
        } else {
            taskList.innerHTML = "<li>Please select a category to view tasks.</li>";
        }
    });

    // Reset progress by clearing completed tasks
    resetTasksBtn.addEventListener('click', () => {
        localStorage.removeItem('completedTasks');
        taskList.innerHTML = "<li>Please select a category to view tasks.</li>";
    });

    // Initialize with a message to select a category
    taskList.innerHTML = "<li>Please select a category to view tasks.</li>";
});
