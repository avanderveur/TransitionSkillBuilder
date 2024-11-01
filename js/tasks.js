document.addEventListener('DOMContentLoaded', () => {
    const resetTasksBtn = document.getElementById('reset-tasks');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Get page-specific key for local storage
    const pageKey = document.title.replace(" - Transition Skill Builder", "");

    // Load completed tasks from local storage
    function loadCompletedTasks() {
        const completedTasks = JSON.parse(localStorage.getItem(pageKey)) || [];
        completedTasks.forEach(taskId => {
            const checkbox = document.getElementById(taskId);
            if (checkbox) checkbox.checked = true;
        });
    }

    // Save completed tasks to local storage
    function saveCompletedTasks() {
        const completedTasks = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);
        localStorage.setItem(pageKey, JSON.stringify(completedTasks));
    }

    // Mark tasks as complete
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCompletedTasks();
        });
    });

    // Reset progress for the current page
    resetTasksBtn.addEventListener('click', () => {
        localStorage.removeItem(pageKey);
        checkboxes.forEach(checkbox => checkbox.checked = false);
    });

    // Load tasks on page load
    loadCompletedTasks();
});
