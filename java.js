        document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('taskInput');
            const addBtn = document.getElementById('addBtn');
            const taskList = document.getElementById('taskList');
            
            loadTasks();
            
            addBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addTask();
            });
            
            function addTask() {
                const taskText = taskInput.value.trim();
                if (!taskText) return;
                
                const taskItem = document.createElement('li');
                taskItem.className = 'task';
                
                const taskSpan = document.createElement('span');
                taskSpan.textContent = taskText;
                taskSpan.addEventListener('click', toggleTask);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'deleteBtn';
                deleteBtn.textContent = 'Удалить';
                deleteBtn.addEventListener('click', deleteTask);
                
                taskItem.appendChild(taskSpan);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
                
                taskInput.value = '';
                saveTasks();
            }
            
            function toggleTask() {
                this.parentElement.classList.toggle('completed');
                saveTasks();
            }
            
            function deleteTask() {
                this.parentElement.remove();
                saveTasks();
            }
            
            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('.task').forEach(task => {
                    tasks.push({
                        text: task.querySelector('span').textContent,
                        completed: task.classList.contains('completed')
                    });
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            
            function loadTasks() {
                const savedTasks = localStorage.getItem('tasks');
                if (savedTasks) {
                    JSON.parse(savedTasks).forEach(task => {
                        const taskItem = document.createElement('li');
                        taskItem.className = 'task';
                        if (task.completed) taskItem.classList.add('completed');
                        
                        const taskSpan = document.createElement('span');
                        taskSpan.textContent = task.text;
                        taskSpan.addEventListener('click', toggleTask);
                        
                        const deleteBtn = document.createElement('button');
                        deleteBtn.className = 'deleteBtn';
                        deleteBtn.textContent = 'Удалить';
                        deleteBtn.addEventListener('click', deleteTask);
                        
                        taskItem.appendChild(taskSpan);
                        taskItem.appendChild(deleteBtn);
                        taskList.appendChild(taskItem);
                    });
                }
            }
        });